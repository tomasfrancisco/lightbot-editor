export const getPathById = (id, items) => {
  let path: string[] = [];

  items.every((item, i) => {
    if (item.id === id) {
      path.push(`${i}`);
    } else if (item.children) {
      const childrenPath = getPathById(id, item.children);

      if (childrenPath.length) {
        path = path
          .concat(`${i}`)
          .concat("children")
          .concat(childrenPath);
      }
    }

    return path.length === 0;
  });

  return path;
};
