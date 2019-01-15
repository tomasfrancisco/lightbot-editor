import { Intent } from "~/models";

export const flattenIntents = (intents?: Intent[]): Intent[] => {
  const result: Intent[] = [];
  if (intents) {
    for (const intent of intents) {
      result.push(intent);
      if (intent.children) {
        result.push(...flattenIntents(intent.children));
      }
    }
  }
  return result;
};
