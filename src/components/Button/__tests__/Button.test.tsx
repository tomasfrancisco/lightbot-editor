import { shallow } from "enzyme";
import * as React from "react";
import { Button } from "src/components/Button/Button";

describe("components/Button", () => {
  test("renders", () => {
    const tree = shallow(<Button>Button Content</Button>);
    expect(tree).toMatchSnapshot();
  });
});
