import gql from "graphql-tag";
import { graphql, QueryResult } from "react-apollo";
import { Keyword } from "src/models";
import {
  deleteKeywordFromCache,
  updateSelectedKeywordCache,
} from "src/modules/KeywordsView/apollo/gql/keywordsCacheUpdate";
import { KeywordEditorViewProps } from "src/modules/KeywordsView/views";

export type DeleteDictionaryData = {
  id: number;
};

const DELETE_KEYWORD_QUERY = gql`
  mutation DeleteDictionary($keyword: DeleteDictionaryData!) {
    deleteDictionary(input: $keyword) {
      id
    }
  }
`;

export type DeleteKeywordData = {
  keywords: Keyword[];
};

export interface DeleteKeywordResult extends QueryResult<DeleteKeywordData> {}

export type DeleteKeywordFunction = (
  props: {
    variables: { keyword: DeleteDictionaryData };
  },
) => Promise<DeleteKeywordResult>;

export const deleteKeyword = graphql<KeywordEditorViewProps, {}, {}, {}>(DELETE_KEYWORD_QUERY, {
  name: "onDeleteKeyword",
  options: ({ selectedKeyword }) => ({
    update: cache => {
      if (selectedKeyword) {
        deleteKeywordFromCache(cache, selectedKeyword);
      }
      updateSelectedKeywordCache(cache, null);
    },
  }),
});
