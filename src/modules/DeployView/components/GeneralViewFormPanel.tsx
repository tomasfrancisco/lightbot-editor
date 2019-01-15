import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { FormColorInput, FormPanel, FormPanelHeader } from "~/components/Form";
import theme from "~/config/theme.js";
import { FormEnum } from "~/constants/FormEnum";
import { LayoutConfigurationFormEnum } from "~/constants/LayoutConfigurationEnum";
import { ColorType } from "~/models";
import { AgentData } from "~/models/AgentData.type";

import { getColorInAgentData } from "../utils";

type RenderGeneralViewFormPanel = {
  form: WrappedFormUtils;
  agentData?: AgentData;
  itemKeyOpened?: string;
  onItemKeySelect(itemKey?: string): void;
};

export const renderGeneralViewFormPanel = ({
  itemKeyOpened,
  form,
  agentData,
  onItemKeySelect
}: RenderGeneralViewFormPanel) => {
  return (
    <FormPanel
      // @ts-ignore
      id={LayoutConfigurationFormEnum.GENERIC_CONFIGURATION_ID}
      key={FormEnum.DEPLOY_GENERAL_GROUP}
      header={<FormPanelHeader>General</FormPanelHeader>}
    >
      <FormColorInput
        title="Link color"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.GENERIC_LINK_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.GENERIC_LINK_COLOR,
          agentData
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.GENERIC_LINK_COLOR]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="User says text"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.GENERIC_USER_SAYS_TEXT_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.GENERIC_USER_SAYS_TEXT_COLOR,
          agentData
        )}
        defaultValue={
          theme[LayoutConfigurationFormEnum.GENERIC_USER_SAYS_TEXT_COLOR]
        }
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="User says background"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.GENERIC_USER_SAYS_BACKGROUND_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.GENERIC_USER_SAYS_BACKGROUND_COLOR,
          agentData
        )}
        defaultValue={
          theme[LayoutConfigurationFormEnum.GENERIC_USER_SAYS_BACKGROUND_COLOR]
        }
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Bot says text"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.GENERIC_BOT_SAYS_TEXT_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.GENERIC_BOT_SAYS_TEXT_COLOR,
          agentData
        )}
        defaultValue={
          theme[LayoutConfigurationFormEnum.GENERIC_BOT_SAYS_TEXT_COLOR]
        }
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Bot says background"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.GENERIC_BOT_SAYS_BACKGROUND_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.GENERIC_BOT_SAYS_BACKGROUND_COLOR,
          agentData
        )}
        defaultValue={
          theme[LayoutConfigurationFormEnum.GENERIC_BOT_SAYS_BACKGROUND_COLOR]
        }
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Send button color"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.GENERIC_MESSAGE_SEND_BTN_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.GENERIC_MESSAGE_SEND_BTN_COLOR,
          agentData
        )}
        defaultValue={
          theme[LayoutConfigurationFormEnum.GENERIC_MESSAGE_SEND_BTN_COLOR]
        }
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
    </FormPanel>
  );
};
