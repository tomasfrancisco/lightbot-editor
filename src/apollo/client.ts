import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { authLink } from "~/apollo/authLink";
import { httpLink } from "~/apollo/httpLink";
import { stateLink } from "~/apollo/stateLink";
import { logoutLink } from "./logoutLink";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development",
  link: ApolloLink.from([
    stateLink,
    authLink.concat(logoutLink.concat(httpLink))
  ])
});
