import { FormGroupItem } from "~/components/Form";

// This method it's fixing the problem with maxDepth. It just supports 2 in order to work.
// It gonna get all item from nestable and put all elements in the same level.
// SO it will extract the children case they exist
export const reactNestableDumbIssueFixer = (
  outputItems: FormGroupItem[]
): any[] => {
  const result: any[] = [];
  for (const item of outputItems) {
    result.push(item);
    if (item.children) {
      result.push(...item.children);
    }
  }
  return result.map(outputItem => outputItem.data);
};
