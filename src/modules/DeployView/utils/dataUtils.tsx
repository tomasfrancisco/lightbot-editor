import { WrappedFormUtils } from "antd/lib/form/Form";
import { LayoutConfigurationFormEnum } from "~/constants/LayoutConfigurationEnum";
import { AgentData } from "~/models/AgentData.type";

export const valdiateAgentData = (form: WrappedFormUtils) => {
  return new Promise(function(resolve: (value: AgentData) => any, reject) {
    form.validateFields((err, fields) => {
      if (err) {
        reject(err);
      } else {
        const widgetInputPlaceholder = fields[
          LayoutConfigurationFormEnum.REPLY_CONFIGURATION_ID
        ]
          ? fields[LayoutConfigurationFormEnum.REPLY_CONFIGURATION_ID]
          : "";
        const widgetTeaser =
          fields[LayoutConfigurationFormEnum.TEASER_CONFIGURATION_ID];
        const widgetHotspotIcon = fields[
          LayoutConfigurationFormEnum.HOTSPOT_ICON_CONFIGURATION_ID
        ]
          ? fields[LayoutConfigurationFormEnum.HOTSPOT_ICON_CONFIGURATION_ID]
          : "";
        const fieldsWidgetThemeData =
          fields[LayoutConfigurationFormEnum.THEME_CONFIGURATION_ID];

        const widgetThemeData = {};

        Object.keys(fieldsWidgetThemeData).forEach(function(key) {
          if (fieldsWidgetThemeData[key] !== "") {
            widgetThemeData[key] = fieldsWidgetThemeData[key];
          }
        });

        resolve({
          widgetInputPlaceholder,
          widgetTeaser,
          widgetHotspotIcon,
          widgetThemeData
        });
      }
    });
  });
};
