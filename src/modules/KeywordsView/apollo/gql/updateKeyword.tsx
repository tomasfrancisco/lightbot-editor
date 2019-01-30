import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";
import { BatchDictionaryData, KeywordValue } from "src/models";
import {
  updateKeywordCache,
  updateSelectedKeywordCache,
} from "src/modules/KeywordsView/apollo/gql/keywordsCacheUpdate";

export const UPDATE_QUERY = gql`
  mutation BatchDictionary($updatedKeyword: BatchDictionaryData!) {
    batchDictionary(input: $updatedKeyword) {
      id
      name
      values {
        id
        value
      }
    }
  }
`;

export type UpdateKeywordData = {
  values: KeywordValue[];
};

export interface UpdateKeywordResult extends QueryResult<UpdateKeywordData> {}

export type UpdateKeywordFunction = (
  props: {
    variables: { updatedKeyword: BatchDictionaryData };
  },
) => Promise<UpdateKeywordResult>;

export const updateKeyword = graphql<{}, {}, {}, {}>(UPDATE_QUERY, {
  name: "updateKeyword",
  options: () => ({
    update: (cache, mutationResult) => {
      const updatedKeyword = _get(mutationResult, ["data", "batchDictionary"]);

      if (updatedKeyword) {
        updateKeywordCache(cache, updatedKeyword);

        updateSelectedKeywordCache(cache, updatedKeyword);
      } else {
        throw Error("Something got wrong with the mutation update");
      }
    },
  }),
});
