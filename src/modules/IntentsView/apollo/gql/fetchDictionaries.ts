import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, Query, QueryResult } from "react-apollo";
import { Dictionary } from "~/models";

export const FETCH_DICTIONARIES_QUERY = gql`
  query fetchDictionaries {
    dictionaries {
      id
      name
    }
  }
`;

export type FetchDictionariesData = {
  dictionaries: Dictionary[];
};

export interface FetchDictionariesResult
  extends QueryResult<FetchDictionariesData> {}

export class FetchDictionariesQuery extends Query<FetchDictionariesData> {}

export const fetchDictionaries = graphql<{}, {}, {}, {}>(
  FETCH_DICTIONARIES_QUERY,
  {
    props: ({ data }) => ({
      dictionaries: _get(data, ["dictionaries"]),
      loading: _get(data, ["loading"])
    })
  }
);
