export enum IntentDeleteActionEnum {
  ONLY_INTENT = "ONLY_INTENT",
  ALL_INTENTS = "ALL_INTENTS"
}

export enum DefaultDeleteActionEnum {
  DEFAULT_DELETE = "DEFAULT_DELETE"
}

export type DeleteActionEnum = IntentDeleteActionEnum | DefaultDeleteActionEnum;
