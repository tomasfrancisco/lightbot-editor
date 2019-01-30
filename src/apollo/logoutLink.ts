import { onError } from "apollo-link-error";
import { RoutesKeysEnum, Routing } from "~/routing";
import { browserHistory } from "~/routing/browserHistory";
import { ErrorCode } from "~/types";

export const logoutLink = onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    let shouldRedirect = false;
    graphQLErrors.forEach(graphQLError => {
      const invalidAuthCode: ErrorCode = "INVALID_AUTH";
      if (graphQLError.extensions!.code === invalidAuthCode) {
        browserHistory.push(Routing.routes[RoutesKeysEnum.LOGOUT].routeProps.path as string);
        shouldRedirect = true;
      }
    });
    if (!shouldRedirect) {
      forward(operation);
    }
  }
});
