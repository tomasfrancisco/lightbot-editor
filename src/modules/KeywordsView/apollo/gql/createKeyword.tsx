import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";
import {
  updateKeywordsList,
  updateSelectedKeywordCache
} from "~/modules/KeywordsView/apollo/gql/keywordsCacheUpdate";

export type CreateDictionaryData = {
  name: string;
};

const dictionaryProps = `
  id
  name
  values {
    id
    value
  }
  `;

const MUTATION_QUERY = gql`
  mutation CreateDictionary($keyword: CreateDictionaryData!) {
    createDictionary(input:$keyword) {
      ${dictionaryProps}
    }
  }
`;

export type CreateKeywordData = {
  createDictionary: {
    id: string;
    name: string;
  };
};

export interface CreateKeywordResult extends QueryResult<CreateKeywordData> {}

export type CreateKeywordFunction = (
  props: {
    variables: { keyword: CreateDictionaryData };
  }
) => Promise<CreateKeywordResult>;

export const createKeyword = graphql<{}, {}, {}, {}>(MUTATION_QUERY, {
  name: "onCreateKeyword",
  options: () => ({
    update: (cache, mutationResult) => {
      const updatedKeyword = _get(mutationResult, ["data", "createDictionary"]);

      updateKeywordsList(cache, updatedKeyword);

      updateSelectedKeywordCache(cache, updatedKeyword);
    }
  })
});
