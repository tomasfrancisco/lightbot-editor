import { Form as AntdForm, Icon, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _get from "lodash.get";
import * as React from "react";
import styled, { css } from "react-emotion";
import uuid from "uuid/v4";
import { Button } from "~/components/Button";
import { DeleteButton, mainDeleteAction } from "~/components/DeleteButton";
import {
  BatchInput,
  Form,
  FormBatchInput,
  FormItem,
  SearchInput,
  TitleInput,
} from "~/components/Form";
import { InputProps, renderInput } from "~/components/Form/Input";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer,
} from "~/components/Section";
import { ElementIdsEnum } from "~/constants/ElementIdsEnum";
import { FormEnum } from "~/constants/FormEnum";
import { BatchDictionaryData, Keyword, KeywordValue } from "~/models";
import { getDictionaryObjectToUpdate } from "~/modules/KeywordsView/handlers";
import {
  getBatchValidationRules,
  getDuplicateKeywordValidator,
  getNotSysEntityValidator,
  singleWordValidator,
} from "~/modules/KeywordsView/utils";

const KEYWORD_NAME_FIELD = "keywordName";

const topSpaceSectionContentStyle = css`
  padding-top: 165px;
  margin: 0;
`;

const headerOptionButtonsSpacingStyle = css`
  margin: 0 0 0 10px;
  padding-bottom: 0 !important;
`;

export type KeywordEditorFormProps = FormComponentProps & {
  values: KeywordValue[];
  selectedKeyword: Keyword;
  isTouched: boolean;
  onDataSave: (data: BatchDictionaryData) => void;
  onDelete: (id: string) => void;
  onTouch: () => void;
};

type State = {
  values: KeywordValue[];
  searchValue: string;
};

export class KeywordEditorFormDisconnected extends React.Component<KeywordEditorFormProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values,
      searchValue: "",
    };

    this.initForm();
  }

  public render() {
    const { selectedKeyword, form, isTouched } = this.props;

    return (
      <Form layout="vertical">
        <Section id={ElementIdsEnum.KEYWORD_EDITOR}>
          <SectionHeader alignment={"left"}>
            <SectionHeaderNavContainer>
              <TitleInput
                fieldDecoratorName={KEYWORD_NAME_FIELD}
                itemKey={KEYWORD_NAME_FIELD}
                form={form}
                value={selectedKeyword.name}
                placeholder="Insert a keyword name please"
                rules={[
                  singleWordValidator("Keyword name should have just one word"),
                  getNotSysEntityValidator(
                    "Keyword name prefix 'sys' is a reserved word and cannot be used",
                  ),
                ]}
              />
              <AntdForm.Item className={headerOptionButtonsSpacingStyle}>
                <DeleteButton
                  mainAction={mainDeleteAction}
                  disabled={selectedKeyword.id === FormEnum.CREATING_ID}
                  onConfirm={this.onConfirmDelete}
                />
              </AntdForm.Item>
              <AntdForm.Item className={headerOptionButtonsSpacingStyle}>
                <Button
                  htmlType="submit"
                  disabled={!isTouched}
                  level="primary"
                  onClick={this.onDataSave}
                >
                  <Icon type="save" />
                  Save
                </Button>
              </AntdForm.Item>
            </SectionHeaderNavContainer>
            <SearchInput onSearchResult={this.onSearch} />
          </SectionHeader>
          <SectionContent className={topSpaceSectionContentStyle}>
            {this.renderItems()}
            <FormItem>
              <Button onClick={this.getOnAdd} level="secondary" block={true}>
                <Icon type="plus" />
                Add Keyword
              </Button>
            </FormItem>
            <FormBatchInput
              form={form}
              onAddBatchFields={this.onAddBatchFields}
              rules={getBatchValidationRules(form)}
            />
          </SectionContent>
        </Section>
      </Form>
    );
  }

  private onSearch = value => {
    this.setState({ searchValue: value });
  };

  private initForm() {
    const { form } = this.props;
    form.getFieldDecorator(FormEnum.KEYWORD_FORM);
  }

  private renderItems = () => {
    const { form } = this.props;
    const { values } = this.state;

    return values.map(keyword => {
      const onRemoveHandler = this.getOnRemove(keyword.id);

      const props = {
        form,
        itemKey: keyword.id,
        placeholder: "Keyword",
        rules: [getDuplicateKeywordValidator(form)],
        value: keyword.value,
      };

      return this.renderInput(props, onRemoveHandler);
    });
  };

  private renderInput = (props: InputProps, onRemoveHandler: () => void) => {
    const { searchValue } = this.state;

    let isInputHidden = false;

    if (searchValue !== "") {
      if (!props.value) {
        isInputHidden = true;
      } else if (!props.value.toLowerCase().includes(searchValue.toLowerCase())) {
        isInputHidden = true;
      }
    }

    return (
      <FormItem key={props.itemKey} isInputHidden={isInputHidden}>
        {renderInput(props)}
        <Icon type="minus-circle-o" onClick={onRemoveHandler} />
      </FormItem>
    );
  };

  private onAddBatchFields = (newValues: BatchInput[]) => {
    const { form, selectedKeyword } = this.props;
    const { values } = this.state;

    const nextKeys = form.getFieldValue(FormEnum.KEYWORD_FORM);

    for (const newValue of newValues) {
      values.push({
        id: newValue.id,
        keywordId: selectedKeyword.id,
        value: newValue.value,
      });
      nextKeys.push(newValue.id);
    }

    this.setState({
      values,
    });
  };

  private getOnAdd = () => {
    const { form } = this.props;

    const nextKeys = form.getFieldValue(FormEnum.KEYWORD_FORM);
    nextKeys.push(uuid());

    form.setFieldsValue({
      [FormEnum.KEYWORD_FORM]: nextKeys,
    });
  };

  private getOnRemove = k => () => {
    const { form } = this.props;

    let nextKeys = form.getFieldValue(FormEnum.KEYWORD_FORM);

    nextKeys = nextKeys.filter(key => key !== k);

    form.setFieldsValue({
      [FormEnum.KEYWORD_FORM]: nextKeys,
    });
  };

  private onConfirmDelete = () => {
    const { onDelete, selectedKeyword } = this.props;
    onDelete(selectedKeyword.id);
  };

  private onDataSave = () => {
    const { onDataSave, selectedKeyword, values, form } = this.props;

    form.validateFields((err, fields) => {
      // Get all input values
      const name = _get(fields, KEYWORD_NAME_FIELD, "");
      const fieldValues = _get(fields, "values", {});

      if (err && err[KEYWORD_NAME_FIELD]) {
        message.error(
          _get(err[KEYWORD_NAME_FIELD], ["errors", 0, "message"], "Something went wrong"),
        );
      }

      if (!err) {
        onDataSave(getDictionaryObjectToUpdate(selectedKeyword, values, name, fieldValues));
      }
    });
  };
}

export const KeywordEditorForm = AntdForm.create<KeywordEditorFormProps>({
  onValuesChange: props => {
    props.onTouch();
  },
})(KeywordEditorFormDisconnected);
