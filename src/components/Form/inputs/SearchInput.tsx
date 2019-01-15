import { Input } from "antd";
import * as React from "react";
import styled from "react-emotion";

const Search = Input.Search;

const SearchContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type SearchInputProps = {
  placeholder?: string;
  enterButton?: string;
  onSearchResult: (value: string) => void;
};

export class SearchInput extends React.Component<SearchInputProps> {
  public render() {
    const { placeholder, enterButton } = this.props;
    return (
      <SearchContainer>
        <Search
          placeholder={placeholder || "Search here"}
          enterButton={enterButton}
          onSearch={this.props.onSearchResult}
          onChange={this.onChange}
        />
      </SearchContainer>
    );
  }

  private onChange = event => {
    this.props.onSearchResult(event.target.value);
  };
}
