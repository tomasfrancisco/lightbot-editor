import _get from "lodash.get";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export function withRouteParams(params: string[]) {
  return function<P>(Component: React.ComponentType<P>) {
    class RouterProxy extends React.Component<RouteComponentProps> {
      public render() {
        const { match, history, location, ...props } = this.props;
        const paramProps = params.reduce((result, param) => {
          // TODO: Currently all route params are used as numbers, but we get them as strings from the parser
          result[param] = Number(_get(this.props.match.params, param, "NaN"));

          if (isNaN(result[param])) {
            result[param] = _get(this.props.match.params, param);
          }

          return result;
        }, {});
        return <Component {...props as P} {...paramProps} />;
      }
    }

    return withRouter(RouterProxy);
  };
}
