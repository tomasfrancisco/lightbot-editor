import { Form as AntdForm } from "antd";
import { shallow } from "enzyme";
import * as React from "react";
import { FormBatchInput } from "~/components/Form/inputs";

describe("components/Form/inputs/FormBatchInput", () => {
  test("renders", () => {
    const Wrapper = AntdForm.create()(FormBatchInput);
    const tree = shallow(<Wrapper />);
    expect(tree).toMatchSnapshot();
  });
});
