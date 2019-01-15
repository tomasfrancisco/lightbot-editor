import { matchPath } from "react-router-dom";
import { routes } from "./routes";

export function findMatchedRoute(pathname: string) {
  const matchedRoute = Object.entries(routes).find(([_, route]) => {
    return !!matchPath(pathname, route.routeProps);
  });

  if (!matchedRoute) {
    return null;
  }

  return matchedRoute;
}
