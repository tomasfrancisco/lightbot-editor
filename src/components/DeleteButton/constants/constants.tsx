import {
  DefaultDeleteActionEnum,
  DeleteAction
} from "~/components/DeleteButton";

export const mainDeleteAction: DeleteAction = {
  confirmationMessage: "Are you sure?",
  key: DefaultDeleteActionEnum.DEFAULT_DELETE
};
