import { Button, Icon } from "antd";
import * as React from "react";

type SaveButtonProps = {
  disabled: boolean;
};

export const SaveButton = ({ disabled }: SaveButtonProps) => (
  <Button type="primary" htmlType="submit" disabled={disabled}>
    <Icon type="save" />
    Save
  </Button>
);
