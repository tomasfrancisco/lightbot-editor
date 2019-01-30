import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql } from "react-apollo";
import { FormId } from "src/constants/FormId";
import { KeywordEditorViewProps } from "src/modules/KeywordsView/views/KeywordEditorView";

export const FETCH_KEYWORD_QUERY = gql`
  query fetchKeywordValues($keywordId: Int!) {
    dictionary(where: { id: $keywordId }) {
      values {
        id
        value
      }
    }
  }
`;

export const fetchKeywordValues = graphql<KeywordEditorViewProps, {}, {}, {}>(FETCH_KEYWORD_QUERY, {
  options: ({ selectedKeyword }) => {
    return {
      variables: {
        keywordId: selectedKeyword!.id,
      },
    };
  },
  props: ({ data }) => {
    return {
      loading: _get(data, ["loading"]),
      values: _get(data, ["dictionary", "values"], []),
    };
  },
  skip: ({ selectedKeyword }) => {
    if (!selectedKeyword) {
      return true;
    }
    if (!selectedKeyword.id) {
      return true;
    }
    const creatingId: FormId = "-1";
    if (selectedKeyword.id === creatingId) {
      return true;
    }
    return false;
  },
});
