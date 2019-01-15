/**
 * @deprecated
 * @lightbot/types should provided the necessary typings for the data model
 */

import { Keyword } from "./Keyword.type";

export type Dictionary = {
  id: string;
  name: string;
  values: Keyword[];
};
