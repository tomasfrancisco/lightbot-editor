import { Icon } from "antd";
import * as React from "react";
import { Button } from "~/components/Button";
import { FormItemContainer } from "~/components/Form";
import { FormCol, FormRow } from "~/components/Form/layout";

type OutputSubmitButtonProps = {
  onTextClick(): void;
  onLinkClick(): void;
  onButtonClick(): void;
};

export const OutputAddButtonGroup = ({
  onTextClick,
  onLinkClick,
  onButtonClick
}: OutputSubmitButtonProps) => (
  <FormItemContainer>
    <FormRow>
      <FormCol span={8}>
        <Button onClick={onTextClick} level="secondary" block={true}>
          <Icon type="message" />
          Add text
        </Button>
      </FormCol>
      <FormCol span={8}>
        <Button onClick={onLinkClick} level="secondary" block={true}>
          <Icon type="link" />
          Add link
        </Button>
      </FormCol>
      <FormCol span={8}>
        <Button onClick={onButtonClick} level="secondary" block={true}>
          <Icon type="right-square-o" />
          Add intent jumps
        </Button>
      </FormCol>
    </FormRow>
  </FormItemContainer>
);
