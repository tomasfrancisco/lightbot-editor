import { Button, Icon, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _clone from "lodash.clone";
import _find from "lodash.find";
import _get from "lodash.get";
import * as React from "react";
import { FormCol, FormRow } from "~/components/Form/layout";

type FormSelectGroupInputProps = {
  value?: string[];
  searchResults: Array<{ key: string; value: string }>;
  onChange?(value: string[]): void;
  onFetch?(): void;
};

type FormSelectGroupInputState = {
  hasThird: boolean;
};

export enum FormSelectGroupEnum {
  FIRST = 0,
  SECOND = 1,
  THIRD = 2
}

class FormSelectGroupInput extends React.Component<
  FormSelectGroupInputProps,
  FormSelectGroupInputState
> {
  constructor(props) {
    super(props);

    this.state = {
      hasThird: _get(props, "value", []).length === 3
    };
  }

  public render() {
    const { value } = this.props;
    const { hasThird } = this.state;

    if (!value) {
      return null;
    }

    return (
      <FormRow>
        <FormCol span={8}>
          <Select
            onChange={this.getOnChangeHandler(FormSelectGroupEnum.FIRST)}
            showSearch={true}
            placeholder="Keyword"
            optionFilterProp="children"
            value={value[FormSelectGroupEnum.FIRST]}
            allowClear={true}
            filterOption={true}
            onFocus={this.getOnFocusHandler(FormSelectGroupEnum.FIRST)}
          >
            {this.renderSearchResults()}
          </Select>
        </FormCol>
        <FormCol span={8}>
          <Select
            onChange={this.getOnChangeHandler(FormSelectGroupEnum.SECOND)}
            showSearch={true}
            placeholder="Keyword"
            optionFilterProp="children"
            value={value[FormSelectGroupEnum.SECOND]}
            allowClear={true}
            filterOption={true}
            onFocus={this.getOnFocusHandler(FormSelectGroupEnum.SECOND)}
          >
            {this.renderSearchResults()}
          </Select>
        </FormCol>
        <FormCol span={8}>
          {(hasThird && (
            <Select
              onChange={this.getOnChangeHandler(FormSelectGroupEnum.THIRD)}
              showSearch={true}
              placeholder="Keyword"
              optionFilterProp="children"
              value={value[FormSelectGroupEnum.THIRD]}
              allowClear={true}
              filterOption={true}
              onFocus={this.getOnFocusHandler(FormSelectGroupEnum.THIRD)}
            >
              {this.renderSearchResults()}
            </Select>
          )) || (
            <Button
              type="dashed"
              style={{ width: "100%" }}
              onClick={this.onAddThirdClick}
            >
              <Icon type="plus" />
            </Button>
          )}
        </FormCol>
      </FormRow>
    );
  }

  private renderSearchResults() {
    const { searchResults } = this.props;

    return searchResults.map(searchResult => (
      <Select.Option key={searchResult.key} value={searchResult.key}>
        {searchResult.value}
      </Select.Option>
    ));
  }

  private onAddThirdClick = () => this.setState({ hasThird: true });

  private getOnChangeHandler = (step: FormSelectGroupEnum) => stepValue => {
    const { onChange, searchResults } = this.props;
    if (!onChange) {
      return;
    }

    let value = _clone(this.props.value);
    if (!value) {
      value = new Array(3).fill("");
    }

    const newValue = _get(
      _find(searchResults, ["key", stepValue]),
      "value",
      ""
    );
    value[step] = newValue;

    if (onChange) {
      onChange(value);
    }
  };

  private getOnFocusHandler = (step: FormSelectGroupEnum) => () => {
    const { onFetch } = this.props;
    if (onFetch) {
      onFetch();
    }
  };
}

export type RenderFormSelectGroupInputProps = FormComponentProps & {
  value: any;
  itemKey: string;
  errorMessage?: string;
  searchResults: Array<{ key: string; value: string }>;
  min: number;
  type: string;
  getValueFromEvent?(e): any;
  getValueProps?(value): any;
  validator?(
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any
  ): any;
  onChange?(value: string[]): void;
  onFetch?(): void;
};

/**
 * This component should be called as a function and not as a JSX component
 * Otherwise, the form is not going to recognize this field and not throw errors
 */
export const renderFormSelectGroupInput = ({
  form,
  itemKey,
  errorMessage,
  value,
  searchResults,
  onFetch,
  getValueFromEvent,
  getValueProps,
  validator,
  min,
  type
}: RenderFormSelectGroupInputProps) =>
  form &&
  form.getFieldDecorator(itemKey, {
    getValueFromEvent,
    // @ts-ignore
    getValueProps,
    initialValue: value,
    rules: [
      {
        message: errorMessage,
        min,
        required: true,
        type,
        validator
      }
    ],
    trigger: "onChange",
    validateTrigger: ["onChange", "onBlur"]
  })(<FormSelectGroupInput onFetch={onFetch} searchResults={searchResults} />);
