import { Form as AntdForm } from "antd";
import { shallow } from "enzyme";
import * as React from "react";
import { FormColorInput } from "src/components/Form/inputs";
import { ColorType } from "src/models";

describe("components/Form/inputs/FormColorInput", () => {
  test("renders", () => {
    const onItemkeySelect = () => {
      /**/
    };
    const Wrapper = AntdForm.create()(FormColorInput);
    const tree = shallow(
      <Wrapper
        itemKey="color-item"
        initialValue="color"
        colorType={ColorType.RGB}
        itemKeyOpened="abc"
        onItemKeySelect={onItemkeySelect}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
