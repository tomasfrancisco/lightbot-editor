import { ValidationRule } from "antd/lib/form";
import { ColorType } from "src/models";

/** Regular expression used to check if our field contains a correct hex color value */
const regexHexColor = "^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$";
/** Regular expression used to check if our field contains a correct RGB color value */
const regexRGBColor = /([R][G][B][(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*[)])/i;
/** Regular expression used to check if our field contains a correct RGBA color value */
const regexRGBAColor = /([R][G][B][A][(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9][0-9]?)|(1\.0)|(1)))[)])/i;

/**
 * Rule validation to check if the color field is corrected set with and hexadecimal or rgb
 * color
 * @param {string} message Message to present case this fiels isn't valid
 * @param {ColorType} colorType Type of color to know what to compare
 * @return {ValidationRule} Validation object that contains the rules to not allow incorrect
 *   color formats
 */
export const colorValidator = (message: string, colorType: ColorType): ValidationRule => {
  return {
    message,
    validator: (rule, value, cb) => {
      let isFieldValid = false;
      if (!value || value === "") {
        cb();
        return;
      }
      if (colorType === ColorType.HEX) {
        isFieldValid = value.match(new RegExp(regexHexColor));
      } else if (colorType === ColorType.RGB) {
        isFieldValid = regexRGBColor.test(value);
      } else if (colorType === ColorType.RGBA) {
        isFieldValid = regexRGBAColor.test(value);
      }

      if (isFieldValid) {
        cb();
      } else {
        cb(false);
      }
    },
  };
};
