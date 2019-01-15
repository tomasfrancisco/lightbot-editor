import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { FormColorInput, FormPanel, FormPanelHeader } from "~/components/Form";
import theme from "~/config/theme.js";
import { FormEnum } from "~/constants/FormEnum";
import { LayoutConfigurationFormEnum } from "~/constants/LayoutConfigurationEnum";
import { ColorType } from "~/models";
import { AgentData } from "~/models/AgentData.type";

import { getColorInAgentData } from "../utils";

type RenderHeaderViewFormPanel = {
  form: WrappedFormUtils;
  agentData?: AgentData;
  itemKeyOpened?: string;
  onItemKeySelect(itemKey?: string): void;
};

export const renderHeaderViewFormPanel = ({
  itemKeyOpened,
  form,
  agentData,
  onItemKeySelect,
}: RenderHeaderViewFormPanel) => {
  return (
    <FormPanel
      // @ts-ignore
      id={LayoutConfigurationFormEnum.CLOSE_CONFIGURATION_ID}
      key={FormEnum.DEPLOY_HEADER_GROUP}
      header={<FormPanelHeader>Header view</FormPanelHeader>}
    >
      <FormColorInput
        title="Gradient color 1"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.HEADER_CONFIGURATION_GRADIENT_FIRST_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.HEADER_CONFIGURATION_GRADIENT_FIRST_COLOR,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.HEADER_CONFIGURATION_GRADIENT_FIRST_COLOR]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Gradient color 2"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.HEADER_CONFIGURATION_GRADIENT_SECOND_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.HEADER_CONFIGURATION_GRADIENT_SECOND_COLOR,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.HEADER_CONFIGURATION_GRADIENT_SECOND_COLOR]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Font"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.HEADER_CONFIGURATION_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.HEADER_CONFIGURATION_COLOR,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.HEADER_CONFIGURATION_COLOR]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
    </FormPanel>
  );
};
