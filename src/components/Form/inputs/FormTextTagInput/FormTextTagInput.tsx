import "./FormTextTagInput.css";

import { Tag as TagAntd } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { GetFieldDecoratorOptions } from "antd/lib/form/Form";
import {
  CompositeDecorator,
  ContentState,
  DraftHandleValue,
  Editor,
  EditorState
} from "draft-js";
import * as React from "react";
import styled from "react-emotion";

const StyledTag = styled(TagAntd)`
  margin-right: 0px !important;
`;

const Tag = ({ children, color }) => (
  <StyledTag color={color}>{children}</StyledTag>
);

export type FormTextTagInputProps = {
  value?: string;
  validTags: string[];
  onChange?(value: string): void;
};

type FormTextTagInputState = {
  editorState: EditorState;
};

export class FormTextTagInput extends React.Component<
  FormTextTagInputProps,
  FormTextTagInputState
> {
  constructor(props: FormTextTagInputProps) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: this.keywordStrategy,
        component: Tag,
        props: {
          color: "green"
        }
      },
      {
        strategy: this.entityKeywordStrategy,
        component: Tag,
        props: {
          color: "blue"
        }
      },
      {
        strategy: this.notValidKeywordsStrategy,
        component: Tag,
        props: {
          color: "red"
        }
      }
    ]);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(props.value || ""),
        compositeDecorator
      )
    };
  }

  public render() {
    const { editorState } = this.state;

    return (
      <div className="ant-input">
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleReturn={this.handleReturn}
        />
      </div>
    );
  }

  private handleReturn = (): DraftHandleValue => {
    return "handled";
  };

  private onChange = (editorState: EditorState) => {
    const { onChange } = this.props;

    this.setState({ editorState });

    if (onChange) {
      onChange(editorState.getCurrentContent().getPlainText());
    }
  };

  private entityKeywordStrategy = (contentBlock, callback, contentState) => {
    const regex = /(?<=\s|^)\$SYS[^ <$]*/gim;

    this.findWithRegex(regex, contentBlock, callback, false);
  };

  private notValidKeywordsStrategy = (contentBlock, callback, contentState) => {
    this.keywordStrategy(contentBlock, callback, contentState, false);
  };

  private keywordStrategy = (contentBlock, callback, _, includes = true) => {
    const regex = /(?<=\s|^)\$[^ <$]*/gm;

    this.findWithRegex(regex, contentBlock, callback, includes);
  };

  private findWithRegex = (regex, contentBlock, callback, includes) => {
    const { validTags } = this.props;
    const text = contentBlock.getText();
    let matchArr;
    let start;
    // tslint:disable-next-line
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      if (includes) {
        if (
          validTags.includes(text.substring(start, start + matchArr[0].length))
        ) {
          callback(start, start + matchArr[0].length);
        }
      } else {
        callback(start, start + matchArr[0].length);
      }
    }
  };
}

const getFieldValidatorKey = (itemKey: string, itemGroup?: string) => {
  if (itemGroup) {
    return `${itemGroup}[${itemKey}]`;
  } else {
    return itemKey;
  }
};

export type RenderFormTextTagInput = FormComponentProps &
  GetFieldDecoratorOptions & {
    itemKey: string;
    itemGroup?: string;
    value: any;
    validTags: string[];
    type?: string;
    errorMessage: string;
    getValueProps: any; // TODO: Remove once antd gets updated
    validator?(
      rule: any,
      value: any,
      callback: any,
      source?: any,
      options?: any
    ): any;
  };

export const renderFormTextTagInput = ({
  form,
  itemKey,
  itemGroup,
  value,
  errorMessage,
  getValueFromEvent,
  getValueProps,
  type,
  validator,
  validTags
}: RenderFormTextTagInput) =>
  form &&
  form.getFieldDecorator(getFieldValidatorKey(itemKey, itemGroup), {
    getValueFromEvent,
    // @ts-ignore
    getValueProps,
    initialValue: value,
    rules: [
      {
        message: errorMessage,
        type,
        validator,
        required: true
      }
    ],
    validateTrigger: ["onChange", "onBlur"]
  })(<FormTextTagInput validTags={validTags} />);
