const sortData = (data, key) =>
  data.sort((a, b) => a[key].localeCompare(b[key]));

const manageDefaultStringForTable = (val) => {
  if (val === "" || val === undefined) {
    return "----";
  } else return val;
};

const removeItemFrom = (list, id) =>
  list.filter((item) => item.id !== id).map((item) => ({ ...item }));

export { sortData, manageDefaultStringForTable, removeItemFrom };
