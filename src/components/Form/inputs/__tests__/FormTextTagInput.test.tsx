// import generateRandomKey from "draft-js/lib/generateRandomKey";
import { shallow } from "enzyme";
import * as React from "react";

import { FormTextTagInput } from "../FormTextTagInput";

// This mock prevents Draft.js of generating random keys and makes
// the snapshots consistent between runs
jest.mock("draft-js/lib/generateRandomKey", () => () => "testing-key");

describe("components/Form/inputs/FormTextTagInput", () => {
  let component;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    const validTags = ["$Hello", "$world"];
    const value = "$Hello $NotValidWord and plain text.";

    component = shallow(
      <FormTextTagInput validTags={validTags} value={value} />
    );
  });

  test("renders", () => {
    jest.runAllTimers();
    expect(component).toMatchSnapshot();
  });
});
