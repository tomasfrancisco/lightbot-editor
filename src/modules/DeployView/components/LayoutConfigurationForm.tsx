import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { css } from "@emotion/core";
import { Button } from "src/components/Button";
import { FormCollapse } from "src/components/Form/components";
import { TitleLabel } from "src/components/Labels";
import { SectionContent, SectionHeader, SectionHeaderNavContainer } from "src/components/Section";
import { FormId } from "src/constants/FormId";
import { LayoutConfigurationFormEnum } from "src/constants/LayoutConfigurationEnum";
import { AgentData } from "src/models/AgentData.type";
import { formCollapseTopMarginStyle, sectionHeaderCenterStyle } from "src/modules/DeployView/style";

import { renderConfigJumpFormPanel } from "./ConfigJumpFormPanel";
import { renderGeneralViewFormPanel } from "./GeneralViewFormPanel";
import { renderHeaderViewFormPanel } from "./HeaderViewFormPanel";
import { renderTeaserAndIconFormPanel } from "./TeaserAndIconFormPanel";

const formStyle = css`
  min-width: 100%;
`;

const topSpaceFormContentStyle = css`
  padding-top: 20px;
`;

const bottomSpaceFormContentStyle = css`
  padding-bottom: 20px;
`;

const topSpaceSectionContentStyle = css`
  margin-top: 50px;
`;

const smallerLineHeight = css`
  line-height: 33px;
`;

const noBottomSpace = css`
  margin-bottom: 0;
`;

type LayoutConfigurationFormProps = FormComponentProps & {
  agentData?: AgentData;
  hasDataChanged: boolean;
  onFieldsChange: () => void;
  onSaveForm: (form: WrappedFormUtils) => void;
};

type LayoutConfigurationFormState = {
  itemKeyOpened?: string;
};

class LayoutConfigurationFormDisconnected extends React.Component<
  LayoutConfigurationFormProps,
  LayoutConfigurationFormState
> {
  constructor(props: LayoutConfigurationFormProps) {
    super(props);

    this.state = {
      itemKeyOpened: undefined,
    };
  }

  public render() {
    const { hasDataChanged, form, agentData } = this.props;
    const { itemKeyOpened } = this.state;

    const defaultActiveKeys: FormId[] = [
      "deploy_teaser_icon_group",
      "deploy_jump_group",
      "deploy_close_group",
      "deploy_header_group",
      "deploy_general_group",
    ];
    return (
      <Form id={LayoutConfigurationFormEnum.FORM_ID} layout="vertical" css={formStyle}>
        <SectionHeader css={sectionHeaderCenterStyle}>
          <SectionHeaderNavContainer css={noBottomSpace}>
            <TitleLabel css={smallerLineHeight}>Layout Configuration</TitleLabel>
            <Button icon="plus" type="primary" disabled={!hasDataChanged} onClick={this.onDataSave}>
              Save
            </Button>
          </SectionHeaderNavContainer>
        </SectionHeader>
        <SectionContent css={topSpaceSectionContentStyle}>
          <FormCollapse
            css={[
              formCollapseTopMarginStyle,
              topSpaceFormContentStyle,
              bottomSpaceFormContentStyle,
            ]}
            bordered={false}
            defaultActiveKey={defaultActiveKeys}
          >
            {renderTeaserAndIconFormPanel({
              form,
              itemKeyOpened,
              agentData,
              onItemKeySelect: this.onItemKeySelect,
            })}
            {renderConfigJumpFormPanel({
              form,
              itemKeyOpened,
              agentData,
              onItemKeySelect: this.onItemKeySelect,
            })}
            {renderHeaderViewFormPanel({
              form,
              itemKeyOpened,
              agentData,
              onItemKeySelect: this.onItemKeySelect,
            })}
            {renderGeneralViewFormPanel({
              form,
              itemKeyOpened,
              agentData,
              onItemKeySelect: this.onItemKeySelect,
            })}
          </FormCollapse>
        </SectionContent>
      </Form>
    );
  }

  private onItemKeySelect = (itemKey?: string) => {
    const { itemKeyOpened } = this.state;
    let newKey = itemKey;

    if (itemKeyOpened === newKey) {
      newKey = undefined;
    }
    this.setState({
      itemKeyOpened: newKey,
    });
  };

  private onDataSave = () => {
    const { form, onSaveForm } = this.props;
    this.onItemKeySelect(undefined);
    onSaveForm(form);
  };
}

export const LayoutConfigurationForm = Form.create<LayoutConfigurationFormProps>({
  onValuesChange: props => {
    const { onFieldsChange } = props;
    onFieldsChange();
  },
})(LayoutConfigurationFormDisconnected);
