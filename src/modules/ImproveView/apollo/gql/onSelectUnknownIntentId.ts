import gql from "graphql-tag";
import { graphql } from "react-apollo";

export const ON_SELECT_UNKNOWN_INTENT_ID = gql`
  mutation onSelectUnknownIntentId($unknownIntentId: String!) {
    onSelectUnknownIntentId(unknownIntentId: $unknownIntentId) @client {
      selectedUnknownIntentId
    }
  }
`;

export type OnSelectUnknownIntentIdFunction = (
  {
    variables: { unknownIntentId }
  }: { variables: { unknownIntentId: string | null } }
) => void;

export const onSelectUnknownIntentId = graphql<{}, {}>(
  ON_SELECT_UNKNOWN_INTENT_ID,
  {
    name: "onSelectUnknownIntentId"
  }
);
