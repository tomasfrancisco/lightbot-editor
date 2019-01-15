import { ValidationRule } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import _get from "lodash.get";
import { whitespaceValidator } from "~/components/Form/validators";
import { FormEnum } from "~/constants/FormEnum";

export const emptyFieldValidator: ValidationRule = {
  message: "Please insert some value",
  validator: (rule, value, cb) => {
    if (!value) {
      cb(false);
      return;
    }
    if (whitespaceValidator(value)) {
      cb(false);
      return;
    }
    cb();
  }
};

export const singleWordValidator = (message: string): ValidationRule => {
  return {
    message,
    validator: (rule, value, cb) => {
      const separatedLines = value.match(/[^\r\n]+/g);
      for (const line of separatedLines) {
        // Transform several spaces in a row to just one space
        let separatedWords = line.replace(/\s+/g, " ");

        // Remove spaces case these are in the end or in the beginning
        separatedWords = separatedWords.trim().split(" ");

        const numberWords = separatedWords.length;

        if (numberWords > 1) {
          cb(false);
          return;
        }
      }

      cb();
    }
  };
};

/**
 * Rule validation to check if there are any keyword repeated.
 * It will compare with current keyword keywords and batch list keywords
 * @param {KeywordValue[]} values List of keywords that are in Keyword
 * @return {ValidationRule} Validation object that contains the rules to not allow duplicate keywords
 */
export const getDuplicateKeywordValidator = (
  form: WrappedFormUtils,
  isBatchValidator = false
): ValidationRule => {
  return {
    message: "Please don't insert repeated keywords",
    validator: (rule, value, cb) => {
      // Get existing values in form
      const keywords = getExistingValues(form);

      // attach values insert in batch input case this is the batch validator
      if (isBatchValidator) {
        // Separate all batch text per lines
        const lines = value.match(/[^\r\n]+/g);

        // Remove all spaces from word to prevent that we upload just word without spaces and
        // Join list of current list of keywords  and keywords and batch input
        keywords.push(...lines.map(line => line.trim()));
      }

      const valuesSoFar = {};

      // Compare if there is any duplicate value with O(n) complexety
      for (const keyword of keywords) {
        if (valuesSoFar[keyword] === true) {
          cb(false);
          return;
        }
      }

      cb();
    }
  };
};

export const getExistingValues = (form: WrappedFormUtils): string[] => {
  const existingKeys = _get(form.getFieldsValue(), FormEnum.KEYWORD_FORM, []);
  const existingValues = _get(form.getFieldsValue(), "values", {});

  return existingKeys.map(key => existingValues[key]);
};

export const getBatchValidationRules = (
  form: WrappedFormUtils
): ValidationRule[] => {
  return [
    emptyFieldValidator,
    singleWordValidator("Please insert just one word per line"),
    getDuplicateKeywordValidator(form, true)
  ];
};

export const getNotSysEntityValidator = (message: string): ValidationRule => {
  return {
    message,
    validator: (rule, value, cb) => {
      const isSysEntity = /(?<=\s|^)SYS[^ <$]*/i.test(value);

      if (isSysEntity) {
        cb(false);
        return;
      }

      cb();
    }
  };
};
