import { Form as AntdForm } from "antd";
import { shallow } from "enzyme";
import * as React from "react";
import { BatchInput, FormBatchInput } from "src/components/Form/inputs";

const onBatchFields = (newValues: BatchInput[]) => {
};

describe("components/Form/inputs/FormBatchInput", () => {
  test("renders", () => {
    const Wrapper = AntdForm.create()(FormBatchInput);
    const tree = shallow(<Wrapper onAddBatchFields={onBatchFields}/>);
    expect(tree).toMatchSnapshot();
  });
});
