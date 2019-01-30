import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { FormColorInput, FormPanel, FormPanelHeader } from "src/components/Form";
import theme from "src/config/theme.json";
import { FormId } from "src/constants/FormId";
import { LayoutConfigurationFormEnum } from "src/constants/LayoutConfigurationEnum";
import { ColorType } from "src/models";
import { AgentData } from "src/models/AgentData.type";

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
  const formKey: FormId = "deploy_header_group";
  return (
    <FormPanel
      // @ts-ignore
      id={LayoutConfigurationFormEnum.CLOSE_CONFIGURATION_ID}
      key={formKey}
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
