import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql } from "react-apollo";
import { FormEnum } from "~/constants/FormEnum";
import { KeywordEditorViewProps } from "~/modules/KeywordsView/views/KeywordEditorView";

export const FETCH_KEYWORD_QUERY = gql`
  query fetchKeywordValues($keywordId: String!) {
    dictionary(where: { id: $keywordId }) {
      values {
        id
        value
      }
    }
  }
`;

export const fetchKeywordValues = graphql(FETCH_KEYWORD_QUERY, {
  options: ({ selectedKeyword }: KeywordEditorViewProps) => {
    return {
      variables: {
        keywordId: selectedKeyword!.id
      }
    };
  },
  props: ({ data }) => {
    return {
      loading: _get(data, ["loading"]),
      values: _get(data, ["dictionary", "values"], [])
    };
  },
  skip: ({ selectedKeyword }) => {
    if (!selectedKeyword) {
      return true;
    }
    if (!selectedKeyword.id) {
      return true;
    }
    if (selectedKeyword.id === FormEnum.CREATING_ID) {
      return true;
    }
    return false;
  }
});
