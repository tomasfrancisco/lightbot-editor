import _merge from "lodash.merge";
import { defaults as improveView } from "src/modules/ImproveView/apollo";
import { defaults as keywordView } from "src/modules/KeywordsView/apollo";

export const defaults = _merge(keywordView, improveView);
