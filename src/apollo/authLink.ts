import { StorageConstantsEnum, StorageInstance } from "@lightbot/browser-storage";
import { setContext } from "apollo-link-context";

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = StorageInstance.getItem(StorageConstantsEnum.EDITOR_TOKEN_ID);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});
