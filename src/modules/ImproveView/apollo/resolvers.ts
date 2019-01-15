import gql from "graphql-tag";

export const resolvers = {
  Mutation: {
    onSelectUnknownIntentId: (_, { unknownIntentId }: { unknownIntentId: string }, { cache }) => {
      const query = gql`
        query GetSelectedUnknownIntentId {
          selectedUnknownIntentId @client
        }
      `;

      const previousState = cache.readQuery({ query });

      const data = {
        ...previousState,
        selectedUnknownIntentId: unknownIntentId,
      };

      cache.writeData({ query, data });

      return null;
    },
  },
};
