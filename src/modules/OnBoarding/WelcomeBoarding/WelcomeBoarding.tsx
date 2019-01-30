import { StorageConstantsEnum, StorageInstance } from "lightbot-ssot/lib";
import * as React from "react";
import { compose } from "react-apollo";
import Joyride, { Props as JoyrideProps } from "react-joyride";
import { ACTIONS, EVENTS } from "react-joyride/es/constants";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Intent } from "src/models";
import { fetchIntent } from "src/modules/IntentEditor/apollo/gql";

import { defaultProps } from "./joyrideConfig";

export type WelcomeBoardingProps = RouteComponentProps & {
  intent?: Intent;
  loading?: boolean;
};

type WelcomeBoardingState = {
  skipped: boolean;
  joyrideProps: JoyrideProps;
};

export class WelcomeBoardingDisconnected extends React.Component<
  WelcomeBoardingProps,
  WelcomeBoardingState
> {
  constructor(props) {
    super(props);

    this.state = {
      skipped:
        // Disabled by request
        // StorageInstance.getItem(StorageConstantsEnum.WELCOME_BOARDING_SKIP) === "true" || false,
        true,
      joyrideProps: defaultProps,
    };
  }

  public componentDidMount() {
    const { joyrideProps, skipped } = this.state;

    this.setState({
      joyrideProps: {
        ...joyrideProps,
        run: !skipped,
      },
    });
  }

  public componentWillReceiveProps(nextProps: WelcomeBoardingProps) {
    const { intent } = nextProps;
    if (intent && intent.isWelcome) {
      const { joyrideProps } = this.state;
      const { stepIndex: currentStepIndex } = joyrideProps;

      if (currentStepIndex) {
        // TODO: This might need a better solution because of react rendering time
        setTimeout(() => {
          this.setState({
            joyrideProps: {
              ...joyrideProps,
              stepIndex: currentStepIndex + 1,
            },
          });
        });
      }
    }
  }

  public render() {
    const { joyrideProps } = this.state;

    return <Joyride {...joyrideProps} callback={this.callback} />;
  }

  private callback = data => {
    const { action, index, type } = data;
    const { joyrideProps } = this.state;

    if (type === EVENTS.TOUR_END && joyrideProps.run) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({
        joyrideProps: {
          ...joyrideProps,
          run: false,
        },
      });
      StorageInstance.setItem(StorageConstantsEnum.WELCOME_BOARDING_SKIP, "true");
    } else if (type === EVENTS.STEP_AFTER && index === 0) {
      this.setState({
        joyrideProps: {
          ...joyrideProps,
          run: true,
          stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
        },
      });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Update state to advance the tour
      this.setState({
        joyrideProps: {
          ...joyrideProps,
          stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
        },
      });
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      this.setState({
        joyrideProps: {
          ...joyrideProps,
          stepIndex: index + 1,
        },
      });
    }
  };
}

export const WelcomeBoarding = compose(
  withRouter,
  fetchIntent,
)(WelcomeBoardingDisconnected);
