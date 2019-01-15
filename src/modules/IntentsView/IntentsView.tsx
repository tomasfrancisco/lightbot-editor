import { Col, message, Row } from "antd";
import { ApolloClient } from "apollo-boost";
import _get from "lodash.get";
import pathToRegexp from "path-to-regexp";
import * as React from "react";
import { ApolloConsumer, compose } from "react-apollo";
import { css } from "react-emotion";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button } from "~/components/Button";
import { SearchInput } from "~/components/Form/inputs";
import { IntentsList } from "~/components/IntentsList";
import { Loading } from "~/components/Loading";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer
} from "~/components/Section";
import { ElementIdsEnum } from "~/constants/ElementIdsEnum";
import { Dictionary, Intent } from "~/models";
import { IntentEditor } from "~/modules/IntentEditor";
import {
  fetchDictionaries,
  fetchIntents,
  FIND_INTENTS_BY_EXPRESSION_QUERY,
  OnUpdateFollowUpIntentFunction,
  updateFollowUpIntent
} from "~/modules/IntentsView/apollo/gql";
import { WelcomeBoarding } from "~/modules/OnBoarding";
import { RoutesKeysEnum, Routing, withRouteParams } from "~/routing";

import { LightbotLayout } from "../LightbotLayout";

const noMarginsSectionContentStyle = css`
  padding: 140px 0 0 0;
  margin-left: 0;
  margin-right: 0;
`;

export type IntentsViewProps = RouteComponentProps & {
  intentsLoading?: boolean;
  intents: Intent[];
  intentId?: string;
  agentId: string;
  dictionaries?: Dictionary[];
  onUpdateFollowUpIntent: OnUpdateFollowUpIntentFunction;
};

type IntentsViewState = {
  isCreating: boolean;
  isLoadingSearch: boolean;
  filteredIntents?: Intent[];
};

export class IntentsViewDisconnected extends React.Component<
  IntentsViewProps,
  IntentsViewState
> {
  constructor(props: IntentsViewProps) {
    super(props);

    const isCreating =
      Routing.utils.findMatchedRoute(props.location.pathname)![0] ===
      RoutesKeysEnum.CREATE_INTENT;

    this.state = {
      isCreating,
      isLoadingSearch: false,
      filteredIntents: undefined
    };
  }

  public render() {
    const {
      match,
      intentsLoading,
      intents,
      intentId,
      agentId,
      dictionaries
    } = this.props;
    const { isCreating, isLoadingSearch, filteredIntents } = this.state;

    if (intentsLoading) {
      return <Loading />;
    }

    const toPath = ({ ...params }) =>
      pathToRegexp.compile(Routing.routes[RoutesKeysEnum.INTENTS].routeProps
        .path as string)({
        agentId,
        ...params
      });

    return (
      <LightbotLayout>
        <Row>
          {intents && <WelcomeBoarding />}
          <Col id={ElementIdsEnum.INTENT_LIST} span={10}>
            <Section>
              <SectionHeader>
                <SectionHeaderNavContainer>
                  <Button
                    icon="plus"
                    onClick={this.onCreationOpen}
                    level="primary"
                  >
                    Add Intent
                  </Button>
                </SectionHeaderNavContainer>
                <ApolloConsumer>
                  {client => (
                    <SearchInput
                      onSearchResult={this.searchIntentsList(client)}
                    />
                  )}
                </ApolloConsumer>
              </SectionHeader>
              <SectionContent className={noMarginsSectionContentStyle}>
                {isLoadingSearch ? (
                  <Loading />
                ) : (
                  <IntentsList
                    selectedIntentId={intentId}
                    intents={filteredIntents || intents}
                    onChange={this.onListChange}
                    toPath={toPath}
                  />
                )}
              </SectionContent>
            </Section>
          </Col>
          <Col span={14}>
            {(isCreating || intentId) && (
              <IntentEditor
                intents={intents}
                dictionaries={dictionaries}
                key={`${agentId}-${intentId}`}
                isCreating={isCreating}
                // onCreate={this.onCreate}
                selectedIntentId={intentId}
              />
            )}
          </Col>
        </Row>
      </LightbotLayout>
    );
  }

  private searchIntentsList = (client: ApolloClient<any>) => (
    searchValue: string
  ) => {
    const { agentId } = this.props;
    if (searchValue === "") {
      this.setState({
        isLoadingSearch: false,
        filteredIntents: undefined
      });
    } else {
      this.setState({
        isLoadingSearch: true
      });
      client
        .query({
          query: FIND_INTENTS_BY_EXPRESSION_QUERY,
          variables: {
            input: { intentExpression: searchValue, agentId, isTopLevel: true }
          }
        })
        .then(data => {
          this.setState({
            isLoadingSearch: false,
            filteredIntents: _get(data, ["data", "findIntentsByExpression"])
          });
        })
        .catch(error => {
          this.setState({
            isLoadingSearch: false,
            filteredIntents: undefined
          });
        });
    }
  };

  private onCreationOpen = () => {
    const { history, agentId } = this.props;

    const uri = pathToRegexp.compile(Routing.routes[
      RoutesKeysEnum.CREATE_INTENT
    ].routeProps.path as string)({
      agentId
    });
    history.push(uri);
  };

  private onListChange = (intent: Intent) => {
    const { onUpdateFollowUpIntent } = this.props;

    message
      .loading("Updating follow-up intents", 1)
      .promise.then(() =>
        onUpdateFollowUpIntent({
          variables: {
            intent: {
              id: intent.id,
              isTopLevel: intent.isTopLevel,
              parentId: intent.parentId
            }
          }
        })
      )
      .then(() => {
        message.success("Follow-up intents updated successfully!");
      })
      .catch(() => {
        message.error("An error occurred while updating follow-up intents.");
      });
  };
}

export const IntentsView = compose(
  withRouteParams(["intentId", "agentId"]),
  withRouter,
  fetchIntents,
  fetchDictionaries,
  updateFollowUpIntent
)(IntentsViewDisconnected);
