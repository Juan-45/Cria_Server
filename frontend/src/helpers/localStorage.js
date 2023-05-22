//LocalStorage Size helper functions

const getLocalStorageSize = () => {
  let totalSize = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const itemSize = new Blob([value]).size / 1000;
    totalSize += itemSize;
  }
  console.log(`Total LS Size (compressed): ${totalSize} Kb`);
};

const getLocalStorageItemSize = (key) => {
  const item = localStorage.getItem(key);
  const itemSize = new Blob([item]).size / 1000;
  console.log(`Item ${key} compressed size: ${itemSize} Kb`);
};

//LocalStorage helper functions

const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    //Only when localStorage is full
    //This error shouldn't happen if a correct localStorage management is implemented
    console.log("Error saving item to localStorage", e);
  }
};

const loadItem = (key) => {
  const item = localStorage.getItem(key);
  //If itemStr is null, it means that it doesn't exist
  if (item) {
    return JSON.parse(item);
  } else return null;
};

const removeItem = (key) => localStorage.removeItem(key);

const clearLocalStorage = () => localStorage.clear();

//Specific use cases helper functions

const save_ps_data = (ps_data) => {
  saveItem("ps_data", ps_data);
  saveItem("ps_data_id", ps_data["ps_data_id"]);
  getLocalStorageSize();
  getLocalStorageItemSize("ps_data");
  getLocalStorageItemSize("ps_data_id");
};

const load_data = (key) => {
  const data = loadItem(key);
  if (data) {
    getLocalStorageSize();
    getLocalStorageItemSize(key);
    return data;
  } else return null;
};

export { save_ps_data, load_data };
