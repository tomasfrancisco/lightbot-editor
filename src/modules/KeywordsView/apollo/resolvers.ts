import gql from "graphql-tag";
import { Keyword } from "src/models";

export const resolvers = {
  Mutation: {
    onSelectKeyword: (_, { keyword }: { keyword: Keyword }, { cache }) => {
      const query = gql`
        query GetSelectedKeyword @client {
          selectedKeyword {
            id
            name
          }
        }
      `;

      const previousState = cache.readQuery({ query });

      const data = {
        ...previousState,
        selectedKeyword: {
          ...previousState.selectedKeyword,
          id: keyword.id,
          name: keyword.name,
        },
      };

      cache.writeData({ query, data });

      return null;
    },
  },
};
