import { Form, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _get from "lodash.get";
import * as React from "react";
import { css } from "react-emotion";
import { Button } from "~/components/Button";
import {
  DeleteAction,
  DeleteActionEnum,
  DeleteButton,
  IntentDeleteActionEnum,
} from "~/components/DeleteButton";
import { FormCollapse, FormPanel, FormPanelHeader, TitleInput } from "~/components/Form";
import {
  IntentOutputsFormGroup,
  IntentTriggersFormGroup,
} from "~/components/IntentForm/form-groups";
import { FormValues } from "~/components/IntentForm/FormValuesType";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer,
} from "~/components/Section";
import { ElementIdsEnum } from "~/constants/ElementIdsEnum";
import { FormEnum } from "~/constants/FormEnum";
import { Dictionary, Intent } from "~/models";
import { flattenIntents } from "~/utils";

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
  key: IntentDeleteActionEnum.ONLY_INTENT,
};

const deleteActions: DeleteAction[] = [
  {
    confirmationMessage:
      "You're deleting this intent. All follow-up intents are going to be moved to the next top parent. Are you sure?",
    key: IntentDeleteActionEnum.ONLY_INTENT,
    optionTitle: "Only this intent (default)",
  },
  {
    confirmationMessage: "You're deleting this intent and it's follow-up intents. Are you sure?",
    key: IntentDeleteActionEnum.ALL_INTENTS,
    optionTitle: "This intent and its follow-up intents",
  },
];

type IntentFormProps = FormComponentProps & {
  intents?: Intent[];
  intent: Intent;
  dictionaries: Dictionary[];
  isTouched: boolean;
  onDelete(intentId: string, action: DeleteActionEnum): void;
  onSubmit(formValues: FormValues): void;
  onTouch(): void;
};

export class IntentFormDisconnected extends React.Component<IntentFormProps> {
  private formKey = FormEnum.INTENT_FORM;

  constructor(props) {
    super(props);

    this.initForm(props);
  }

  public render() {
    const { intent, form, dictionaries, intents, isTouched } = this.props;

    return (
      <Form
        id={ElementIdsEnum.INTENT_EDITOR}
        className={formStyle}
        layout="vertical"
        autoComplete="off"
        onSubmit={this.onSubmit}
      >
        <Section>
          <SectionHeader alignment="right">
            <SectionHeaderNavContainer className={noBottomSpaceStyle}>
              <TitleInput
                itemKey={FormIndexEnum.NAME}
                form={form}
                value={_get(intent, "name", "")}
                placeholder="Insert an intent title please"
              />
              <Form.Item className={headerOptionButtonsSpacingStyle}>
                <DeleteButton
                  dropdownActions={deleteActions}
                  mainAction={defaultDeleteAction}
                  onConfirm={this.onDeleteClick}
                  disabled={this.isDeleteButtonDisabled}
                />
              </Form.Item>
              <Form.Item className={headerOptionButtonsSpacingStyle}>
                <Button htmlType="submit" disabled={!isTouched} level="primary">
                  <Icon type="save" />
                  Save
                </Button>
              </Form.Item>
            </SectionHeaderNavContainer>
          </SectionHeader>
          <SectionContent className={topSpaceSectionContentStyle}>
            <FormCollapse
              bordered={false}
              defaultActiveKey={[FormIndexEnum.TRIGGERS, FormIndexEnum.OUTPUTS]}
            >
              <FormPanel
                // @ts-ignore
                id={ElementIdsEnum.INTENT_EDITOR_TRIGGERS}
                key={FormIndexEnum.TRIGGERS}
                header={<FormPanelHeader>User says</FormPanelHeader>}
              >
                <IntentTriggersFormGroup
                  form={form}
                  formKey={this.formKey}
                  triggers={intent.triggers}
                  dictionaries={dictionaries}
                />
              </FormPanel>
              <FormPanel
                // @ts-ignore
                id={ElementIdsEnum.INTENT_EDITOR_OUTPUTS}
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
    const { form, intent } = props;

    const initialValue = {
      [FormIndexEnum.TRIGGERS]: intent.triggers.map(trigger => trigger.id),
    };
    form.getFieldDecorator(this.formKey, { initialValue });
  }
}

export const IntentForm = Form.create<IntentFormProps>({
  onFieldsChange: props => {
    props.onTouch();
  },
})(IntentFormDisconnected);
