import _get from "lodash.get";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export function withRouteParams(params: string[]) {
  return function<P>(Component: React.ComponentType<P>) {
    class RouterProxy extends React.Component<RouteComponentProps> {
      public render() {
        const { match, history, location, ...props } = this.props;
        const paramProps = params.reduce((result, param) => {
          result[param] = _get(this.props.match.params, param);
          return result;
        }, {});
        return <Component {...props} {...paramProps} />;
      }
    }

    return withRouter(RouterProxy);
  };
}
