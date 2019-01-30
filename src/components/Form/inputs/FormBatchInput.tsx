import { Icon, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ValidationRule } from "antd/lib/form/Form";
import * as React from "react";
import { Button } from "src/components/Button";
import { FormItem } from "src/components/Form";
import { getUniqueNumberForSession } from "src/utils";

const { TextArea } = Input;

const BATCH_FIELD_ID = "batchField";

export type BatchInput = {
  id: number;
  value: string;
};

export type FormBatchInputProps = FormComponentProps & {
  onAddBatchFields: (newValues: BatchInput[]) => void;
  rules?: ValidationRule[];
};

type FormBatchInputState = {
  isBatchFieldOpened: boolean;
};

export class FormBatchInput extends React.Component<FormBatchInputProps, FormBatchInputState> {
  constructor(props) {
    super(props);

    this.state = {
      isBatchFieldOpened: false,
    };
  }

  public render() {
    const { isBatchFieldOpened } = this.state;

    return isBatchFieldOpened
      ? this.renderBatchInputFieldOpened()
      : this.renderBatchInputFieldClosed();
  }

  private renderBatchInputFieldClosed = () => {
    return (
      <FormItem>
        <Button onClick={this.onAddBatch} level="secondary" block={true}>
          <Icon type="plus" />
          Add Batch
        </Button>
      </FormItem>
    );
  };

  private renderBatchInputFieldOpened = () => {
    const { form, rules } = this.props;

    return (
      <div>
        <FormItem>
          {form.getFieldDecorator(BATCH_FIELD_ID, {
            rules,
            validateFirst: true,
            validateTrigger: [],
          })(<TextArea placeholder="Insert here your keywords list" />)}
        </FormItem>
        <FormItem>
          <Button onClick={this.addBatchKeywordsToList} level="secondary" block={true}>
            <Icon type="plus" />
            Add list of keywords
          </Button>
        </FormItem>
        <FormItem>
          <Button onClick={this.onCloseBatch} level="secondary" block={true}>
            <Icon type="minus" />
            Close Batch
          </Button>
        </FormItem>
      </div>
    );
  };

  private addBatchKeywordsToList = () => {
    const { form, onAddBatchFields } = this.props;
    form.validateFields(
      [BATCH_FIELD_ID],
      {
        first: true,
      },
      (errors, values) => {
        if (!errors || errors.length === 0) {
          const cleanedKeywords = new Array<BatchInput>();
          const separatedLines = values.batchField.match(/[^\r\n]+/g);
          for (const line of separatedLines) {
            cleanedKeywords.push({ id: getUniqueNumberForSession(), value: line.trim() });
          }
          form.resetFields([BATCH_FIELD_ID]);

          this.setState({
            isBatchFieldOpened: false,
          });

          onAddBatchFields(cleanedKeywords);
        }
      },
    );
  };

  private onAddBatch = () => {
    this.setState({
      isBatchFieldOpened: true,
    });
  };

  private onCloseBatch = () => {
    this.setState({
      isBatchFieldOpened: false,
    });
  };
}
