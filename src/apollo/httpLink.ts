import { createHttpLink } from "apollo-link-http";

export const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/editor"
      : `https://api.lightbot.io/editor`,
});
