import { Icon, Input } from "antd";
import Form, { FormComponentProps, ValidationRule } from "antd/lib/form";
import * as React from "react";
import { SketchPicker } from "react-color";
import {
  ColorPickerBackgroundView,
  ColorPickerContainer
} from "~/components/ColorPicker/layout";
import {
  generateRgbaString,
  generateRgbString
} from "~/components/ColorPicker/utils";
import { FormItem } from "~/components/Form/components/FormItem";
import {
  closeButtonStyle,
  CloseContainer,
  ColorRow,
  ColorSelector,
  inputStyle
} from "~/components/Form/layout";
import { colorValidator } from "~/components/Form/validators";
import { ColorType } from "~/models";

export type FormColorInputProps = FormComponentProps & {
  required?: boolean;
  itemKey: string;
  title?: string;
  colorType: ColorType;
  itemGroup?: string;
  rules?: ValidationRule[];
  initialValue?: string;
  defaultValue?: string;
  placeholder?: string;
  itemKeyOpened?: string;
  onItemKeySelect(itemKey?: string): void;
};

export type FormColorInputState = {
  currentSelectedColor?: string;
};

export class FormColorInput extends React.Component<
  FormColorInputProps,
  FormColorInputState
> {
  constructor(props: FormColorInputProps) {
    super(props);

    this.state = {
      currentSelectedColor: props.initialValue || props.defaultValue
    };
  }

  public render() {
    const {
      title,
      form,
      initialValue,
      rules,
      placeholder,
      colorType,
      required
    } = this.props;
    const { currentSelectedColor } = this.state;
    const remainRules = rules ? rules : [];

    if (form) {
      return (
        <div>
          {this.renderPicker}
          <FormItem title={title}>
            <ColorRow>
              {form.getFieldDecorator(this.fieldDecoratorId, {
                initialValue,
                rules: [
                  {
                    message: "Please select some color.",
                    required: required ? true : false,
                    whitespace: true
                  },
                  colorValidator("Please insert the correct format", colorType),
                  ...remainRules
                ],
                validateFirst: true,
                validateTrigger: ["onChange", "onBlur"]
              })(
                <Input
                  className={inputStyle}
                  placeholder={placeholder}
                  onChange={this.onInputFieldChange}
                />
              )}
              <ColorSelector
                style={{ backgroundColor: currentSelectedColor }}
                onClick={this.onColorSelectorPress}
              />
            </ColorRow>
          </FormItem>
        </div>
      );
    } else {
      return null;
    }
  }

  private get renderPicker() {
    const { colorType, itemKey, itemKeyOpened } = this.props;
    const { currentSelectedColor } = this.state;
    if (itemKey === itemKeyOpened) {
      return (
        <ColorPickerBackgroundView onClick={this.onBackgroundClick}>
          <CloseContainer>
            <Icon type="close" className={closeButtonStyle} />
          </CloseContainer>
          <ColorPickerContainer onClick={this.onSketchClick}>
            <SketchPicker
              disableAlpha={colorType !== ColorType.RGBA}
              onChangeComplete={this.onChangeColor}
              color={currentSelectedColor}
            />
          </ColorPickerContainer>
        </ColorPickerBackgroundView>
      );
    } else {
      return null;
    }
  }

  private get fieldDecoratorId() {
    const { itemKey, itemGroup } = this.props;

    if (itemGroup) {
      return `${itemGroup}[${itemKey}]`;
    } else {
      return itemKey;
    }
  }

  private onBackgroundClick = () => {
    const { onItemKeySelect } = this.props;
    onItemKeySelect(undefined);
  };

  private onSketchClick = e => {
    e.stopPropagation();
  };

  private onChangeColor = color => {
    const { form } = this.props;
    let newColor = color.hex;
    const { colorType } = this.props;
    if (colorType === ColorType.RGBA) {
      newColor = generateRgbaString(color.rgb);
    } else if (colorType === ColorType.RGB) {
      newColor = generateRgbString(color.rgb);
    }

    form.setFieldsValue({ [this.fieldDecoratorId]: newColor });

    this.setState({
      currentSelectedColor: newColor
    });
  };

  private onInputFieldChange = e => {
    const { defaultValue } = this.props;

    let newValue = e.target.value;

    if (newValue === "") {
      newValue = defaultValue;
    }

    this.setState({
      currentSelectedColor: newValue
    });
  };

  private onColorSelectorPress = () => {
    const { onItemKeySelect, itemKey } = this.props;

    onItemKeySelect(itemKey);
  };
}
