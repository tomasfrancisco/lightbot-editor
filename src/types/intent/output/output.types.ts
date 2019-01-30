import { IntentOutputTypeEnum } from "./output.enums";

export interface IntentOutputBaseType {
  type: IntentOutputTypeEnum;
}

export interface IntentPlainOutputType extends IntentOutputBaseType {
  value: {
    label: string;
  };
}

export interface IntentChoicesOutputType extends IntentOutputBaseType {
  value: {
    choices: string[];
  };
}

export interface IntentLinkOutputType extends IntentOutputBaseType {
  value: {
    label: string;
    link: string;
  };
}

export type IntentJumpOutputType = {
  label: string;
  intentId: number;
};

export interface IntentJumpsOutputType extends IntentOutputBaseType {
  value: {
    jumps: IntentJumpOutputType[];
  };
}
export interface IntentDecoratedOutputType extends IntentOutputBaseType {
  value: {
    label: string;
    objects: IntentOutputType[];
  };
}

export type IntentOutputType =
  | IntentPlainOutputType
  | IntentChoicesOutputType
  | IntentLinkOutputType
  | IntentJumpsOutputType
  | IntentDecoratedOutputType;

export type SearchIntentOutputType = {
  id?: string;
  value?: string;
  type?: string | IntentOutputTypeEnum;
};

export type SwapIntentOutputType = {
  intentId: string;
  firstOutputId: string;
  secondOutputId: string;
};
