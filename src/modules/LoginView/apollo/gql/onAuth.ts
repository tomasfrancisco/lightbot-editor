import gql from "graphql-tag";
import { graphql, Query, QueryResult } from "react-apollo";
import { LoginViewProps } from "~/modules/LoginView";

export const ON_AUTH = gql`
  query onAuth {
    me {
      id
    }
  }
`;

export type OnAuthData = {
  me: {
    id: string;
  };
};

export interface OnAuthResult extends QueryResult<OnAuthData> {}

export class OnAuthQuery extends Query<OnAuthData> {}

export const onAuth = graphql<LoginViewProps, OnAuthResult, {}, {}>(
  ON_AUTH,
  {}
);
