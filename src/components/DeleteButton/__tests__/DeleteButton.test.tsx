import { shallow } from "enzyme";
import * as React from "react";
import {
  DefaultDeleteActionEnum,
  DeleteAction,
  DeleteButton
} from "~/components/DeleteButton";

const deleteAction: DeleteAction = {
  confirmationMessage: "Are you sure",
  key: DefaultDeleteActionEnum.DEFAULT_DELETE
};

const deleteConfirmation = (selectedAction: DeleteAction) => {
  const action = selectedAction;
};

describe("components/Button", () => {
  test("renders", () => {
    const tree = shallow(
      <DeleteButton
        mainAction={deleteAction}
        disabled={false}
        onConfirm={deleteConfirmation}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
