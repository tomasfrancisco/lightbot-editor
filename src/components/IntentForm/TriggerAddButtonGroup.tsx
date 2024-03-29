import { Icon } from "antd";
import * as React from "react";
import { Button } from "src/components/Button";
import { FormItemContainer } from "src/components/Form";
import { FormCol, FormRow } from "src/components/Form/layout";

type TriggerAddButtonProps = {
  onTextClick(): void;
  onKeywordsClick(): void;
};

export const TriggerAddButtonGroup = ({ onTextClick, onKeywordsClick }: TriggerAddButtonProps) => (
  <FormItemContainer>
    <FormRow>
      <FormCol span={12}>
        <Button onClick={onTextClick} level="secondary" block={true}>
          <Icon type="message" />
          Add text
        </Button>
      </FormCol>
      <FormCol span={12}>
        <Button onClick={onKeywordsClick} level="secondary" block={true}>
          <Icon type="tags-o" />
          Add keywords
        </Button>
      </FormCol>
    </FormRow>
  </FormItemContainer>
);
