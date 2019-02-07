import { Form } from "antd";
import { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import * as React from "react";
import { css } from "@emotion/core";
import { FormItemContainer } from "src/components/Form/components/FormItem/FormItemContainer";
import { FormItemDeleteIcon } from "src/components/Form/components/FormItem/FormItemDeleteIcon";
import { FormItemIcon } from "src/components/Form/components/FormItem/FormItemIcon";
import { FormRow } from "src/components/Form/layout";
import { SubTitleLabel } from "src/components/Labels";

const titleLabelStyle = css`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

const hiddenInputStyle = css`
  display: none;
`;

type FormItemProps = AntdFormItemProps & {
  isInputHidden?: boolean;
  itemKey?: string;
  children: any;
  iconType?: string;
  removeTooltipTitle?: string;
  sortHandler?: any;
  title?: string;
  onRemove?(): void;
};

export const FormItem = ({
  isInputHidden,
  onRemove,
  removeTooltipTitle,
  iconType,
  sortHandler,
  title,
  children,
  ...props
}: FormItemProps) => (
  <FormRow css={[isInputHidden && hiddenInputStyle]}>
    {sortHandler}
    {iconType && <FormItemIcon type={iconType} />}
    <FormItemContainer>
      {title && <SubTitleLabel css={titleLabelStyle}>{title}</SubTitleLabel>}
      <Form.Item {...props}>{children}</Form.Item>
    </FormItemContainer>
    <FormItemDeleteIcon onRemove={onRemove} tooltipTitle={removeTooltipTitle || "Remove"} />
  </FormRow>
);
