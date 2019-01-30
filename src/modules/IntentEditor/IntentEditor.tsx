import { message } from "antd";
import _get from "lodash.get";
import pathToRegexp from "path-to-regexp";
import * as React from "react";
import { compose } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IntentDeleteActionType } from "src/components/DeleteButton";
import { IntentForm } from "src/components/IntentForm";
import { FormValues } from "src/components/IntentForm/FormValuesType";
import { Loading } from "src/components/Loading";
import { Intent, IntentActionData, TriggerActionData } from "src/models";
import {
  createIntent,
  CreateIntentFunction,
  fetchIntent,
  updateIntent,
  UpdateIntentFunction,
} from "src/modules/IntentEditor/apollo/gql";
import { deleteIntent, DeleteIntentFunction } from "src/modules/IntentEditor/apollo/gql/deleteIntent";
import { transformToTriggersActionData } from "src/modules/IntentEditor/utils/transformers";
import { RoutesKeysEnum, Routing, withRouteParams } from "src/routing";
import { Dictionary, IntentOutputType } from "src/types";
import { getUniqueNumberForSession } from "src/utils";

export type IntentEditorProps = RouteComponentProps & {
  intents?: Intent[];
  isCreating: boolean;
  agentId: string;
  intentId: number;
  intent?: Intent;
  loading?: boolean;
  dictionaries: Dictionary[];
  onUpdateIntent?: UpdateIntentFunction;
  onCreateIntent?: CreateIntentFunction;
  onDeleteIntent?: DeleteIntentFunction;
};

type IntentEditorState = {
  intent?: Intent;
  isTouched: boolean;
};

class IntentEditorDisconnected extends React.Component<IntentEditorProps, IntentEditorState> {
  constructor(props) {
    super(props);

    this.state = {
      intent: this.getIntent(props),
      isTouched: false,
    };
  }

  public componentWillReceiveProps(nextProps) {
    // In case prop intent has transitioned
    // from null/undefined to truthy (it means was fetched)
    if (!this.props.intent && nextProps.intent) {
      this.setState({
        intent: this.getIntent(nextProps),
      });
    }

    // In case intent item has changed or updated
    if (this.props.intent !== nextProps.intent) {
      this.setState({
        intent: this.getIntent(nextProps),
        isTouched: false,
      });
    }
  }

  public render() {
    const { loading, intents, dictionaries } = this.props;
    const { isTouched, intent } = this.state;

    if (loading) {
      return <Loading />;
    } else {
      if (intent) {
        return (
          <IntentForm
            key={intent.id}
            intent={intent}
            onDelete={this.onIntentDelete}
            onSubmit={this.onIntentFormSubmit}
            dictionaries={dictionaries}
            intents={intents}
            onTouch={this.onTouch}
            isTouched={isTouched}
          />
        );
      } else {
        return null;
      }
    }
  }

  private onTouch = () => {
    this.setState({
      isTouched: true,
    });
  };

  private getIntent(props: IntentEditorProps = this.props): Intent | undefined {
    const { intent, isCreating } = props;

    if (isCreating) {
      const newIntent: Intent = {
        id: getUniqueNumberForSession(),
        isFallback: false,
        isTopLevel: true,
        isWelcome: false,
        name: "",
        outputs: [],
        parentId: null,
        triggers: [],
      };

      return newIntent;
    }

    return intent;
  }

  private onIntentFormSubmit = (formValues: FormValues) => {
    const { isCreating, agentId, intentId, onCreateIntent, onUpdateIntent, history } = this.props;
    const { intent } = this.state;

    if (!intent) {
      throw new Error("There's no defined intent on this page");
    }

    const triggers: TriggerActionData[] = transformToTriggersActionData(
      isCreating,
      intent.triggers,
      formValues.triggers,
    );

    // Extracts ids from the display output object
    const outputs: IntentOutputType[] = Object.keys(formValues.outputs).map(outputKey => {
      const { id, ...output } = formValues.outputs[outputKey];
      return output;
    });

    const newIntent: IntentActionData = {
      agentId: isCreating ? agentId : undefined,
      id: intentId || undefined,
      name: formValues.name !== intent.name ? formValues.name : undefined,
      outputs,
      parentId: isCreating ? intent.parentId : undefined,
      triggers,
    };

    const persist = isCreating ? onCreateIntent : onUpdateIntent;
    if (persist) {
      message
        .loading(`${isCreating ? "Creating" : "Updating"} intent.`, 1)
        .promise.then(() =>
          persist({
            variables: {
              intent: newIntent,
            },
          }),
        )
        .then(({ data }) => {
          message.success(`Intent ${isCreating ? "created" : "updated"} successfully!`);

          // Move URL to newly created intent
          const newIntentId = _get(data, ["createIntent", "id"]);
          if (newIntentId) {
            history.push(
              pathToRegexp.compile(Routing.routes[RoutesKeysEnum.INTENTS].routeProps
                .path as string)({
                agentId,
                intentId: newIntentId,
              }),
            );
          }
        })
        .catch(() => {
          message.error(
            `An error occurred while ${isCreating ? "creating" : "updating"} the intent.`,
          );
        });
    }
  };

  private onIntentDelete = (intentId: number, action: IntentDeleteActionType) => {
    const { onDeleteIntent, history, agentId } = this.props;

    if (onDeleteIntent) {
      message
        .loading(`Deleting intent...`, 1)
        .promise.then(() =>
          onDeleteIntent({
            variables: {
              intentId,
              withChildren: action === "ALL_INTENTS",
            },
          }),
        )
        .then(() => {
          message.success(`Intent deleted successfully!`);

          // Move URL to intents list
          history.push(
            pathToRegexp.compile(Routing.routes[RoutesKeysEnum.INTENTS].routeProps.path as string)({
              agentId,
            }),
          );
        })
        .catch(() => {
          message.error(`An error occurred while deleting the intent.`);
        });
    }
  };
}

export const IntentEditor = compose(
  withRouteParams(["agentId", "intentId"]),
  withRouter,
  createIntent,
  updateIntent,
  deleteIntent,
  fetchIntent,
)(IntentEditorDisconnected);
