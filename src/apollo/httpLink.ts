import { createHttpLink } from "apollo-link-http";

export const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_GRAPHQL_ENDPOINT}`,
  credentials: "include",
  fetchOptions: {
    credentials: "include",
  },
});
