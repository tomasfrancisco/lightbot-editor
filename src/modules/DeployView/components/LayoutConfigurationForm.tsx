import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import { css, cx } from "react-emotion";
import { Button } from "~/components/Button";
import { FormCollapse } from "~/components/Form/components";
import { TitleLabel } from "~/components/Labels";
import { SectionContent, SectionHeader, SectionHeaderNavContainer } from "~/components/Section";
import { FormEnum } from "~/constants/FormEnum";
import { LayoutConfigurationFormEnum } from "~/constants/LayoutConfigurationEnum";
import { AgentData } from "~/models/AgentData.type";
import { formCollapseTopMarginStyle, sectionHeaderCenterStyle } from "~/modules/DeployView/style";

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
    return (
      <Form id={LayoutConfigurationFormEnum.FORM_ID} layout="vertical" className={formStyle}>
        <SectionHeader className={sectionHeaderCenterStyle}>
          <SectionHeaderNavContainer className={noBottomSpace}>
            <TitleLabel className={smallerLineHeight}>Layout Configuration</TitleLabel>
            <Button icon="plus" type="primary" disabled={!hasDataChanged} onClick={this.onDataSave}>
              Save
            </Button>
          </SectionHeaderNavContainer>
        </SectionHeader>
        <SectionContent className={topSpaceSectionContentStyle}>
          <FormCollapse
            className={cx(
              formCollapseTopMarginStyle,
              topSpaceFormContentStyle,
              bottomSpaceFormContentStyle,
            )}
            bordered={false}
            defaultActiveKey={[
              FormEnum.DEPLOY_TEASER_ICON_GROUP,
              FormEnum.DEPLOY_JUMP_GROUP,
              FormEnum.DEPLOY_CLOSE_GROUP,
              FormEnum.DEPLOY_HEADER_GROUP,
              FormEnum.DEPLOY_GENERAL_GROUP,
            ]}
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
