import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql } from "react-apollo";

export const GET_SELECTED_KEYWORD_QUERY = gql`
  {
    selectedKeyword @client {
      id
      name
    }
  }
`;

export const getSelectedKeyword = graphql(GET_SELECTED_KEYWORD_QUERY, {
  props: ({ data }) => {
    return {
      selectedKeyword: _get(data, ["selectedKeyword"])
    };
  }
});
