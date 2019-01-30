import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { FormColorInput, FormPanel, FormPanelHeader } from "src/components/Form";
import theme from "src/config/theme.json";
import { FormId } from "src/constants/FormId";
import { LayoutConfigurationFormEnum } from "src/constants/LayoutConfigurationEnum";
import { ColorType } from "src/models";
import { AgentData } from "src/models/AgentData.type";

import { getColorInAgentData } from "../utils";

type RenderConfigJumpFormPanel = {
  form: WrappedFormUtils;
  agentData?: AgentData;
  itemKeyOpened?: string;
  onItemKeySelect(itemKey?: string): void;
};

export const renderConfigJumpFormPanel = ({
  itemKeyOpened,
  form,
  agentData,
  onItemKeySelect,
}: RenderConfigJumpFormPanel) => {
  const formKey: FormId = "deploy_jump_group";
  return (
    <FormPanel
      // @ts-ignore
      id={LayoutConfigurationFormEnum.JUMP_CONFIGURATION_ID}
      key={formKey}
      header={<FormPanelHeader>Jump button</FormPanelHeader>}
    >
      <FormColorInput
        title="Background"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.JUMP_CONFIGURATION_BACKGROUND}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.JUMP_CONFIGURATION_BACKGROUND,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.JUMP_CONFIGURATION_BACKGROUND]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Font"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.JUMP_CONFIGURATION_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.JUMP_CONFIGURATION_COLOR,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.JUMP_CONFIGURATION_COLOR]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
    </FormPanel>
  );
};
