import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { httpLink } from "src/apollo/httpLink";
import { stateLink } from "src/apollo/stateLink";

import { logoutLink } from "./logoutLink";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development",
  link: ApolloLink.from([stateLink, logoutLink.concat(httpLink)]),
});
