import { ErrorCode } from "@lightbot/types";
import { onError } from "apollo-link-error";
import { RoutesKeysEnum, Routing } from "~/routing";
import { browserHistory } from "~/routing/browserHistory";

export const logoutLink = onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    let shouldRedirect = false;
    graphQLErrors.forEach(graphQLError => {
      if (graphQLError.extensions!.code === ErrorCode.INVALID_AUTH) {
        browserHistory.push(Routing.routes[RoutesKeysEnum.LOGOUT].routeProps.path as string);
        shouldRedirect = true;
      }
    });
    if (!shouldRedirect) {
      forward(operation);
    }
  }
});
