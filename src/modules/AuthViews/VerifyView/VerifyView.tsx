import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { compose } from "react-apollo";
import queryString from "query-string";
import { authenticationHelper } from "src/utils/authenticationHelper";
import { isEmpty, isUndefined } from "lodash";
import { Routing, RoutesKeysEnum } from "src/routing";

type VerifyViewProps = RouteComponentProps & {};

export const VerifyView = compose(withRouter)(
  ({ location: { search }, history }: VerifyViewProps) => {
    const queryParams = queryString.parse(search);
    authenticationHelper.verifyToken = queryParams.token as string;

    if (
      isUndefined(authenticationHelper.verifyToken) ||
      isEmpty(authenticationHelper.verifyToken)
    ) {
      // Redirect user to somewhere else
      history.replace({
        pathname: Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path,
      });
    } else {
      // Remove token from query strings
      history.replace({
        pathname: Routing.routes[RoutesKeysEnum.CHANGE_PASSWORD].routeProps.path,
      });
    }

    return null;
  },
);
