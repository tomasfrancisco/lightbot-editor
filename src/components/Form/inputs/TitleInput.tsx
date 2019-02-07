import { Input } from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form/Form";
import * as React from "react";
import {
  emptyIconHeaderStyle,
  RowTitle,
  titleErrorStyle,
  titleInputHeaderStyle,
  titleInputStyle,
  TitleStyledEmptyIcon,
  TitleStyledIcon,
} from "src/components/Form/layout";
import { InterpolationWithTheme } from "@emotion/core";

type TitleInputProps = {
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?(value: string): void;
};

type TitleInputState = {
  isFocused: boolean;
};

class FormTitleInput extends React.Component<TitleInputProps, TitleInputState> {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  public render() {
    const { value, placeholder, className } = this.props;
    return (
      <Input
        css={[
          titleInputStyle,
          titleInputHeaderStyle,
          !this.isTitleValid() && titleErrorStyle,
          className,
        ]}
        size="large"
        prefix={<TitleStyledIcon type="edit" />}
        suffix={this.renderSuffix()}
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }

  private renderSuffix() {
    if (this.isTitleValid()) {
      return null;
    }
    return <TitleStyledEmptyIcon css={emptyIconHeaderStyle} type="close-circle" />;
  }

  private isTitleValid = () => {
    const { value } = this.props;

    return value || value!.replace(/\s/g, "") !== "";
  };

  private onChange = ({ target }) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(target.value);
    }
  };

  private onFocus = () => {
    this.setState({ isFocused: true });
  };

  private onBlur = () => {
    this.setState({ isFocused: false });
  };
}

type RenderTitleInputProps = FormComponentProps & {
  onChange?: () => void;
  placeholder?: string;
  itemKey: string;
  value: string;
  rules?: ValidationRule[];
  fieldDecoratorName?: string;
  rowCss?: InterpolationWithTheme<any>;
};

const renderIntentTitleInput = ({
  onChange,
  itemKey,
  form,
  value,
  placeholder,
  rules = [],
  fieldDecoratorName,
}: RenderTitleInputProps) =>
  form &&
  form.getFieldDecorator(fieldDecoratorName || `values[${itemKey}]`, {
    initialValue: value,
    rules: [
      {
        message: "Please provide a title",
        required: true,
        type: "string",
        whitespace: true,
      },
      ...rules,
    ],
    validateFirst: true,
    validateTrigger: ["onChange", "onBlur"],
  })(<FormTitleInput placeholder={placeholder} onChange={onChange} />);

export const TitleInput = (props: RenderTitleInputProps) => (
  <RowTitle css={props.rowCss}>{renderIntentTitleInput(props)}</RowTitle>
);
