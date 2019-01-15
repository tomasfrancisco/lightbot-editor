import { Col, message, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import ApolloClient from "apollo-client";
import * as React from "react";
import { ApolloConsumer, compose } from "react-apollo";
import uuid from "uuid/v4";
import { Button } from "~/components/Button";
import {
  CodeHighlighter,
  CodeHighlighterButton
} from "~/components/CodeHighlighter";
import { DeployButton } from "~/components/DeployButton";
import { Loading } from "~/components/Loading";
import {
  SectionCard,
  sectionContentFitableStyle,
  sectionFillFreeSpaceStyle,
  sectionWithColumnFlexDirection,
  sectionWithRigthMargin
} from "~/components/Section";
import {
  SectionGrid,
  SectionGridHorizontalSeparator
} from "~/components/Section/SectionGrid";
import { getWidgetScript, removeWidget, Widget } from "~/components/Widget";
import { AgentData } from "~/models/AgentData.type";
import {
  updateWidgetData,
  UpdateWidgetDataFunction
} from "~/modules/DeployView/apollo/gql";
import { fetchAgentData } from "~/modules/DeployView/apollo/gql/fetchAgentData";
import { LayoutConfigurationForm } from "~/modules/DeployView/components";
import { valdiateAgentData } from "~/modules/DeployView/utils";
import { LightbotLayout } from "~/modules/LightbotLayout";
import { ON_DEPLOY } from "~/modules/LightbotLayout/apollo/gql";
import { withRouteParams } from "~/routing";

export type DeployViewProps = {
  loading?: boolean;
  agentData?: AgentData;
  agentId: string;
  onUpdateWidgetData: UpdateWidgetDataFunction;
};
export type DeployViewState = {
  deployLoading: boolean;
  hasDataChanged: boolean;
  reloadWidget: boolean;
};

class DeployViewDisconnected extends React.Component<
  DeployViewProps,
  DeployViewState
> {
  constructor(props) {
    super(props);

    this.state = {
      deployLoading: false,
      hasDataChanged: false,
      reloadWidget: true
    };
  }

  public componentWillUnmount() {
    removeWidget(false);
  }

  public render() {
    const { loading, agentData, agentId } = this.props;
    const { deployLoading, hasDataChanged, reloadWidget } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <LightbotLayout>
        <Row>
          <Col span={10}>
            <SectionGrid className={sectionWithRigthMargin}>
              <SectionCard
                className={[
                  sectionContentFitableStyle,
                  sectionWithColumnFlexDirection
                ].join(" ")}
              >
                <ApolloConsumer>
                  {client => (
                    <DeployButton
                      onClick={this.getOnDeployClick(client)}
                      loading={deployLoading}
                    />
                  )}
                </ApolloConsumer>
                <CodeHighlighter agentId={agentId}>
                  <CodeHighlighterButton onClick={this.onCopyToClipBoardClick}>
                    Copy
                  </CodeHighlighterButton>
                </CodeHighlighter>
              </SectionCard>
              <SectionGridHorizontalSeparator />
              <SectionCard className={[sectionFillFreeSpaceStyle].join(" ")}>
                <LayoutConfigurationForm
                  agentData={agentData}
                  onSaveForm={this.onSaveForm}
                  hasDataChanged={hasDataChanged}
                  onFieldsChange={this.onFieldsChange}
                />
              </SectionCard>
            </SectionGrid>
          </Col>
          {reloadWidget && <Widget agentId={agentId} key={uuid()} />}
        </Row>
      </LightbotLayout>
    );
  }

  private getOnDeployClick = (client: ApolloClient<any>) => async () => {
    const { agentId } = this.props;
    this.setState({
      deployLoading: true,
      reloadWidget: false
    });

    try {
      await message.loading("Deployment in progress...", 1).promise;
      await client.query({
        query: ON_DEPLOY,
        variables: {
          agentId
        },
        fetchPolicy: "no-cache"
      });
      message.success("The agent was deployed successfully!");
    } catch (err) {
      message.error(
        "An error ocurred while deploying. Please contact support."
      );
    } finally {
      this.setState({
        deployLoading: false,
        reloadWidget: true
      });
    }
  };

  private onFieldsChange = () => {
    this.setState({
      hasDataChanged: true,
      reloadWidget: false
    });
  };

  private onSaveForm = (form: WrappedFormUtils) => {
    const { agentId } = this.props;

    valdiateAgentData(form)
      .then(agentData => {
        return this.props.onUpdateWidgetData({
          variables: {
            agentId,
            widgetInputPlaceholder: agentData.widgetInputPlaceholder,
            widgetThemeData: JSON.stringify(agentData.widgetThemeData),
            widgetHotspotIcon: agentData.widgetHotspotIcon,
            widgetTeaser: agentData.widgetTeaser
          }
        });
      })
      .then(response => {
        message.success("Configuration saved with success");
        this.setState({
          hasDataChanged: false,
          reloadWidget: true
        });
      })
      .catch(error => {
        message.error("An error occurred while saving new configuration.");
      });
  };

  private onCopyToClipBoardClick = e => {
    const { agentId } = this.props;
    const el = document.createElement("textarea");
    el.value = getWidgetScript(agentId);
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    message.success("Widget script has been copied to clipboard");
  };
}

export const DeployView = compose(
  withRouteParams(["agentId"]),
  fetchAgentData,
  updateWidgetData
)(DeployViewDisconnected);
