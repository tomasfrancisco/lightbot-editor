import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Keyword } from "~/models";

export const ON_SELECT_KEYWORD_MUTATION = gql`
  mutation onSelectKeyword($keyword: Keyword!) {
    onSelectKeyword(keyword: $keyword) @client
  }
`;

export type OnSelectKeywordFunction = (
  {
    variables: { keyword }
  }: { variables: { keyword: Keyword } }
) => void;

export const onSelectKeyword = graphql<{}, {}>(ON_SELECT_KEYWORD_MUTATION, {
  name: "onSelectKeyword"
});
