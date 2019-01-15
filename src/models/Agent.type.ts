/**
 * @deprecated
 * @lightbot/types should provided the necessary typings for the data model
 */

import { Intent } from "~/models/Intent.type";

export type Agent = {
  id: string;
  name: string;
  intents: Intent[];
  unknownTriggersCount: number;
};
