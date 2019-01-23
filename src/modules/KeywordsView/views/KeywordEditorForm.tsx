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
  keywordValues: ReadonlyArray<KeywordValue>;
  readonly searchValue: string;
};

export class KeywordEditorFormDisconnected extends React.Component<KeywordEditorFormProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      keywordValues: [...props.values],
      searchValue: "",
    };

    this.initForm();
  }

  public render() {
    const { selectedKeyword, form, isTouched } = this.props;

    return (
      <Form id={ElementIdsEnum.KEYWORD_EDITOR} layout="vertical">
        <Section>
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
              <Button onClick={this.onAdd} level="secondary" block={true}>
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
    const { keywordValues } = this.state;

    return keywordValues.map(keyword => {
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
    const { keywordValues } = this.state;

    const keywordValuesFromBatch: BatchInput[] = [];
    for (const newValue of newValues) {
      keywordValuesFromBatch.push({
        id: newValue.id,
        value: newValue.value,
      });
    }

    this.setState({
      keywordValues: keywordValues.concat(keywordValuesFromBatch),
    });
  };

  private onAdd = () => {
    const { keywordValues } = this.state;

    this.setState({
      keywordValues: keywordValues.concat({
        id: uuid(),
        value: "",
      }),
    });
  };

  private getOnRemove = (keyId: string) => () => {
    const { keywordValues } = this.state;

    this.setState({
      keywordValues: keywordValues.filter(value => value.id !== keyId),
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
