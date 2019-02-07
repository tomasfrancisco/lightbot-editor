import { Form, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _get from "lodash.get";
import * as React from "react";
import { css } from "@emotion/core";
import { Button } from "src/components/Button";
import { DeleteAction, DeleteActionType, DeleteButton } from "src/components/DeleteButton";
import { FormCollapse, FormPanel, FormPanelHeader, TitleInput } from "src/components/Form";
import {
  IntentOutputsFormGroup,
  IntentTriggersFormGroup,
} from "src/components/IntentForm/form-groups";
import { FormValues } from "src/components/IntentForm/FormValuesType";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer,
} from "src/components/Section";
import { ElementIdsType } from "src/constants/ElementIdsType";
import { FormId } from "src/constants/FormId";
import { Intent } from "src/models";
import { Dictionary } from "src/types";
import { flattenIntents } from "src/utils";

const topSpaceSectionContentStyle = css`
  padding-top: 20px;
  margin-top: 90px;
`;

const formStyle = css`
  min-width: 314px;
  margin-left: 16px;
`;

const noBottomSpaceStyle = css`
  margin-bottom: 0;
  padding-bottom: 0 !important;
`;

const headerOptionButtonsSpacingStyle = css`
  margin: 0 0 0 10px;
  padding-bottom: 0 !important;
`;

enum FormIndexEnum {
  NAME = "intent_name",
  TYPE = "intent_type",
  TRIGGERS = "intent_triggers",
  OUTPUTS = "intent_outputs",
}

const defaultDeleteAction: DeleteAction = {
  confirmationMessage: "Are you sure?",
  key: "ONLY_INTENT",
};

const deleteActions: DeleteAction[] = [
  {
    confirmationMessage:
      "You're deleting this intent. All follow-up intents are going to be moved to the next top parent. Are you sure?",
    key: "ONLY_INTENT",
    optionTitle: "Only this intent (default)",
  },
  {
    confirmationMessage: "You're deleting this intent and it's follow-up intents. Are you sure?",
    key: "ALL_INTENTS",
    optionTitle: "This intent and its follow-up intents",
  },
];

type IntentFormProps = FormComponentProps & {
  intents?: Intent[];
  intent: Intent;
  dictionaries: Dictionary[];
  isTouched: boolean;
  onDelete(intentId: number, action: DeleteActionType): void;
  onSubmit(formValues: FormValues): void;
  onTouch(): void;
};

export class IntentFormDisconnected extends React.Component<IntentFormProps> {
  private formKey: FormId = "intent_form_keys";

  constructor(props) {
    super(props);

    this.initForm(props);
  }

  public render() {
    const { intent, form, dictionaries, intents, isTouched } = this.props;
    const formId: ElementIdsType = "intent-editor";
    const formPanelTriggersId: ElementIdsType = "intent-editor-triggers";
    const formPanelOutputsId: ElementIdsType = "intent-editor-outputs";
    return (
      <Form
        id={formId}
        css={formStyle}
        layout="vertical"
        autoComplete="off"
        onSubmit={this.onSubmit}
      >
        <Section>
          <SectionHeader alignment="right">
            <SectionHeaderNavContainer css={noBottomSpaceStyle}>
              <TitleInput
                itemKey={FormIndexEnum.NAME}
                form={form}
                value={_get(intent, "name", "")}
                placeholder="Insert an intent title please"
              />
              <Form.Item css={headerOptionButtonsSpacingStyle}>
                <DeleteButton
                  dropdownActions={deleteActions}
                  mainAction={defaultDeleteAction}
                  onConfirm={this.onDeleteClick}
                  disabled={this.isDeleteButtonDisabled}
                />
              </Form.Item>
              <Form.Item css={headerOptionButtonsSpacingStyle}>
                <Button htmlType="submit" disabled={!isTouched} level="primary">
                  <Icon type="save" />
                  Save
                </Button>
              </Form.Item>
            </SectionHeaderNavContainer>
          </SectionHeader>
          <SectionContent css={topSpaceSectionContentStyle}>
            <FormCollapse
              bordered={false}
              defaultActiveKey={[FormIndexEnum.TRIGGERS, FormIndexEnum.OUTPUTS]}
            >
              <FormPanel
                id={formPanelTriggersId}
                key={FormIndexEnum.TRIGGERS}
                header={<FormPanelHeader>User says</FormPanelHeader>}
              >
                <IntentTriggersFormGroup
                  form={form}
                  formKey={this.formKey}
                  triggers={intent.triggers}
                  dictionaries={dictionaries}
                  onTouch={this.props.onTouch}
                />
              </FormPanel>
              <FormPanel
                id={formPanelOutputsId}
                key={FormIndexEnum.OUTPUTS}
                header={<FormPanelHeader>Bot says</FormPanelHeader>}
              >
                <IntentOutputsFormGroup
                  form={form}
                  formKey={this.formKey}
                  outputs={intent.outputs}
                  intents={flattenIntents(intents)}
                  onTouch={this.props.onTouch}
                />
              </FormPanel>
            </FormCollapse>
          </SectionContent>
        </Section>
      </Form>
    );
  }

  private get isDeleteButtonDisabled() {
    const { intent } = this.props;
    return !intent.name || intent.isFallback || intent.isWelcome;
  }

  private onSubmit = event => {
    event.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, fields) => {
      if (!err) {
        const formValues: FormValues = {
          name: fields.values[FormIndexEnum.NAME],
          outputs: fields.values[FormIndexEnum.OUTPUTS] ? fields.values[FormIndexEnum.OUTPUTS] : [],
          triggers: { ...fields.values[FormIndexEnum.TRIGGERS] },
          type: fields.values[FormIndexEnum.TYPE],
        };

        onSubmit(formValues);
        this.setState({
          isTouched: false,
        });
      }
    });
  };

  private onDeleteClick = (action: DeleteAction) => {
    const { onDelete, intent } = this.props;

    if (onDelete) {
      onDelete(intent.id, action.key);
    }
  };

  private initForm(props: IntentFormProps) {
    const { form } = props;
    form.getFieldDecorator(this.formKey);
  }
}

export const IntentForm = Form.create<IntentFormProps>({
  onValuesChange: props => {
    props.onTouch();
  },
})(IntentFormDisconnected);
