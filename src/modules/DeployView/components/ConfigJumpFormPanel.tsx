import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { FormColorInput, FormPanel, FormPanelHeader } from "~/components/Form";
import theme from "~/config/theme.js";
import { FormEnum } from "~/constants/FormEnum";
import { LayoutConfigurationFormEnum } from "~/constants/LayoutConfigurationEnum";
import { ColorType } from "~/models";
import { AgentData } from "~/models/AgentData.type";

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
  return (
    <FormPanel
      // @ts-ignore
      id={LayoutConfigurationFormEnum.JUMP_CONFIGURATION_ID}
      key={FormEnum.DEPLOY_JUMP_GROUP}
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
