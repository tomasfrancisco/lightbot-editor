import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { defaults } from "src/apollo/defaults";
import { resolvers } from "src/apollo/resolvers";

const inMemoryCache = new InMemoryCache();
export const stateLink = withClientState({
  cache: inMemoryCache,
  defaults,
  resolvers,
});
