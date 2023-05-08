export const matchCurrentPath = (nested, currentPath) => {
  if (nested) {
    const pathsList = nested.map((i) => i.to);
    const result = pathsList.find((path) => path === currentPath);

    if (result) {
      return true;
    } else {
      return false;
    }
  }
};
