import { DefaultDeleteActionType, DeleteAction } from "src/components/DeleteButton";

const key: DefaultDeleteActionType = "DEFAULT_DELETE";
export const mainDeleteAction: DeleteAction = {
  confirmationMessage: "Are you sure?",
  key,
};
