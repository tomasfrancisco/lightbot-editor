import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql } from "react-apollo";

export const FETCH_KEYWORDS_QUERY = gql`
  query fetchKeywords {
    dictionaries {
      id
      name
    }
  }
`;

export const fetchKeywords = graphql<{}, {}, {}, {}>(FETCH_KEYWORDS_QUERY, {
  props: ({ data }) => {
    return {
      keywords: _get(data, ["dictionaries"], []),
      loading: _get(data, ["loading"])
    };
  }
});
