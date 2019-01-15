export const getIntentProps = (isCreating: boolean) => `
  id
  name
  isTopLevel
  isFallback
  isWelcome
  parentId
  triggers {
    id
    value
    type
  }
  outputs
  ${getChildren(isCreating)}
`;

const getChildren = (isCreating: boolean) => {
  if (isCreating) {
    return `
    children {
      id
    }`;
  } else {
    return ``;
  }
};
