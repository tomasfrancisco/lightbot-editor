import { shallow } from "enzyme";
import * as React from "react";
import { DeleteAction, DeleteButton } from "src/components/DeleteButton";

const deleteAction: DeleteAction = {
  confirmationMessage: "Are you sure",
  key: "DEFAULT_DELETE",
};

const deleteConfirmation = (selectedAction: DeleteAction) => {
  const action = selectedAction;
};

describe("components/Button", () => {
  test("renders", () => {
    const tree = shallow(
      <DeleteButton mainAction={deleteAction} disabled={false} onConfirm={deleteConfirmation} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
