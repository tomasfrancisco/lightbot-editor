import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { defaults } from "~/apollo/defaults";
import { resolvers } from "~/apollo/resolvers";

const inMemoryCache = new InMemoryCache();
export const stateLink = withClientState({
  cache: inMemoryCache,
  defaults,
  resolvers,
});
