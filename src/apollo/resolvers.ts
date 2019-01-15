import _merge from "lodash.merge";
import { resolvers as improveView } from "~/modules/ImproveView/apollo";
import { resolvers as keywordView } from "~/modules/KeywordsView/apollo";

export const resolvers = _merge(keywordView, improveView);
