import * as React from "react";
import { css } from "react-emotion";
import { Button } from "~/components/Button";
import { SearchInput } from "~/components/Form/inputs";
import { List, ListItemData } from "~/components/List";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionHeaderNavContainer,
  sectionWithRigthMargin
} from "~/components/Section";
import { Keyword } from "~/models";

const noMarginsSectionContentStyle = css`
  padding: 140px 0 0 0;
  margin-left: 0;
  margin-right: 0;
`;

const bottomSpace = css`
  margin-bottom: 20px;
`;

export type KeywordsSelectorViewProps = {
  keywords?: Keyword[];
  selectedKeyword?: Keyword;
  onSelectKeyword: (keyword: Keyword) => void;
  onAddKeyword: () => void;
};

export type KeywordsSelectorViewState = {
  searchValue: string;
};

export class KeywordsSelectorView extends React.Component<
  KeywordsSelectorViewProps,
  KeywordsSelectorViewState
> {
  constructor(props: KeywordsSelectorViewProps) {
    super(props);

    this.state = {
      searchValue: ""
    };
  }
  public render() {
    const { selectedKeyword, onAddKeyword } = this.props;

    const selectedRowKeys: string[] = [];
    if (selectedKeyword) {
      selectedRowKeys.push(selectedKeyword.id);
    }

    return (
      <Section className={sectionWithRigthMargin}>
        <SectionHeader alignment="left">
          <SectionHeaderNavContainer className={bottomSpace}>
            <Button icon="plus" type="primary" onClick={onAddKeyword}>
              Add Keyword
            </Button>
          </SectionHeaderNavContainer>
          <SearchInput onSearchResult={this.searchKeywordsList} />
        </SectionHeader>
        <SectionContent className={noMarginsSectionContentStyle}>
          <List
            items={this.listItemsData}
            onChangeItemSelection={this.onKeywordSelectChange}
            selectedListItemId={selectedKeyword && selectedKeyword.id}
          />
        </SectionContent>
      </Section>
    );
  }

  private getFilteredKeywordsList = () => {
    const { keywords } = this.props;
    const { searchValue } = this.state;

    if (keywords) {
      return keywords.filter(keyword =>
        keyword.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return [];
  };

  private searchKeywordsList = (searchValue: string) => {
    this.setState({ searchValue });
  };

  private get listItemsData(): ListItemData[] | undefined {
    return this.getFilteredKeywordsList().map(keyword => {
      return {
        id: keyword.id,
        title: keyword.name
      };
    });
  }

  private onKeywordSelectChange = (newSelecedKeywordId: string) => {
    const { onSelectKeyword, keywords } = this.props;
    if (keywords) {
      const selectedKeyword = keywords.find(keyword => {
        return keyword.id === newSelecedKeywordId;
      });

      if (selectedKeyword) {
        onSelectKeyword(selectedKeyword);
      }
    }
  };
}
