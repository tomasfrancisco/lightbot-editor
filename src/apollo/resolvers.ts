import _merge from "lodash.merge";
import { resolvers as improveView } from "src/modules/ImproveView/apollo";
import { resolvers as keywordView } from "src/modules/KeywordsView/apollo";

export const resolvers = _merge(keywordView, improveView);
