import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";

export const GET_SELECTED_UNKNOWN_INTENT_ID_QUERY = gql`
  {
    selectedUnknownIntentId @client
  }
`;

export type GetSelectedUnknownIntentIdData = {
  selectedUnknownIntentId: string;
};

export type GetSelectedUnknownIntentIdResult = QueryResult<GetSelectedUnknownIntentIdData>;

export const getSelectedUnknownIntentId = graphql<{}, GetSelectedUnknownIntentIdResult, {}, {}>(
  GET_SELECTED_UNKNOWN_INTENT_ID_QUERY,
  {
    props: ({ data }) => ({
      selectedUnknownIntentId: _get(data, ["selectedUnknownIntentId"]),
    }),
  },
);
