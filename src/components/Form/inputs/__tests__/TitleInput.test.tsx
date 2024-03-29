import { Form as AntdForm } from "antd";
import { shallow } from "enzyme";
import * as React from "react";
import { TitleInput } from "src/components/Form/inputs";

describe("components/Form/inputs/TitleInput", () => {
  test("renders", () => {
    const onItemkeySelect = () => {
      /**/
    };
    const Wrapper = AntdForm.create()(TitleInput);
    const tree = shallow(<Wrapper placeholder="placeholder" itemKey="itemkey" value="value" />);
    expect(tree).toMatchSnapshot();
  });
});
