import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import {
  FormColorInput,
  FormImageInput,
  FormItem,
  FormPanel,
  FormPanelHeader,
  renderFormTextAreaInput,
  renderFormTextInput,
} from "src/components/Form";
import theme from "src/config/theme.json";
import { FormId } from "src/constants/FormId";
import { LayoutConfigurationFormEnum } from "src/constants/LayoutConfigurationEnum";
import { ColorType } from "src/models";
import { AgentData } from "src/models/AgentData.type";

import { getColorInAgentData } from "../utils";

type RenderTeaserAndIconFormPanelProps = {
  form: WrappedFormUtils;
  agentData?: AgentData;
  itemKeyOpened?: string;
  onItemKeySelect(itemKey?: string): void;
};

export const renderTeaserAndIconFormPanel = ({
  form,
  agentData,
  onItemKeySelect,
  itemKeyOpened,
}: RenderTeaserAndIconFormPanelProps) => {
  const formKey: FormId = "deploy_teaser_icon_group";
  return (
    <FormPanel
      // @ts-ignore
      id={LayoutConfigurationFormEnum.TEASER_CONFIGURATION_ID}
      key={formKey}
      header={<FormPanelHeader>Teaser & Icon</FormPanelHeader>}
    >
      <FormItem title="Teaser">
        {renderFormTextAreaInput({
          form,
          itemKey: LayoutConfigurationFormEnum.TEASER_CONFIGURATION_ID,
          value: agentData ? agentData.widgetTeaser : "",
          placeholder: "Enter a teaser",
          errorMessage: "Please insert some value",
          required: true,
        })}
      </FormItem>
      <FormItem title="Reply placeholder">
        {renderFormTextInput({
          form,
          itemKey: LayoutConfigurationFormEnum.REPLY_CONFIGURATION_ID,
          value: agentData ? agentData.widgetInputPlaceholder : "",
          placeholder: "Use default",
        })}
      </FormItem>
      <FormImageInput
        title="Hotspot icon"
        form={form}
        itemKey={LayoutConfigurationFormEnum.HOTSPOT_ICON_CONFIGURATION_ID}
        initialValue={agentData && agentData.widgetHotspotIcon ? agentData.widgetHotspotIcon : ""}
        placeholder="Use Default"
      />
      <FormColorInput
        title="Hotspot background"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.HOTSPOT_CONFIGURATION_BACKGROUND}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.HOTSPOT_CONFIGURATION_BACKGROUND,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.HOTSPOT_CONFIGURATION_BACKGROUND]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
      <FormColorInput
        title="Hotspot close icon"
        placeholder="Use default"
        itemGroup={LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID}
        itemKey={LayoutConfigurationFormEnum.CLOSE_CONFIGURATION_COLOR}
        form={form}
        initialValue={getColorInAgentData(
          LayoutConfigurationFormEnum.CLOSE_CONFIGURATION_COLOR,
          agentData,
        )}
        defaultValue={theme[LayoutConfigurationFormEnum.CLOSE_CONFIGURATION_COLOR]}
        itemKeyOpened={itemKeyOpened}
        colorType={ColorType.HEX}
        onItemKeySelect={onItemKeySelect}
      />
    </FormPanel>
  );
};
