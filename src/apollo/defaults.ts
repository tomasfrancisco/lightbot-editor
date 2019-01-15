import _merge from "lodash.merge";
import { defaults as improveView } from "~/modules/ImproveView/apollo";
import { defaults as keywordView } from "~/modules/KeywordsView/apollo";

export const defaults = _merge(keywordView, improveView);
