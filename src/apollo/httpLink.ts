import { createHttpLink } from "apollo-link-http";

export const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});
