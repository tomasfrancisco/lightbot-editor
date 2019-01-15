import { shallow } from "enzyme";
import * as React from "react";

import { SearchInput } from "../SearchInput";

describe("components/Form/inputs/TitleInput", () => {
  test("renders", () => {
    const onSearch = value => {
      /**/
    };
    const tree = shallow(<SearchInput onSearchResult={onSearch} />);
    expect(tree).toMatchSnapshot();
  });
});
