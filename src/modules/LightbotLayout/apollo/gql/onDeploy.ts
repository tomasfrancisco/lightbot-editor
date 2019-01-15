import gql from "graphql-tag";

export const ON_DEPLOY = gql`
  query onDeploy($agentId: ID!) {
    findAgent(input: { agentId: $agentId }) {
      deploy {
        id
      }
    }
  }
`;
