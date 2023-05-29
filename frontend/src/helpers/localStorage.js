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

//--------LocalStorage helper functions

const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    //Only when localStorage is full
    //This error shouldn't happen if a correct localStorage management is implemented
    //M console.log("Error saving item to localStorage", e);
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

//--------Load data from localStorage
const load_data = (key) => {
  const data = loadItem(key);
  if (data) {
    return data;
  } else return null;
};

//--------Get localStorage keys

const getCurrentSessionTimestamp_key = (user_id) =>
  `session_${user_id}_timestamp`;

const getCurrentSession_key = (user_id) => `session_${user_id}`;

const getPreviousSession_Key = (user_id) => `session_${user_id}_previous`;

const getCurrentUserSessionID_key = (user_id) => `session_${user_id}_ID`;

//--------Save data to localStorage

const save_ps_data = (ps_data) => {
  saveItem("ps_data", ps_data);
  saveItem("ps_data_id", ps_data["ps_data_id"]);
};

const save_currentSession_timestamp = (user_id) => {
  const currentTimestamp = Date.now();
  saveItem(getCurrentSessionTimestamp_key(user_id), currentTimestamp);
};

const save_loggedUser_data = (loggedUser_data) => {
  const key_loggedUser_data = "loggedUser_data";
  saveItem(key_loggedUser_data, loggedUser_data);
};

//--------Clean localStorage for currentUser
const clean_currentSession = (user_id) => {
  removeItem(getCurrentSessionTimestamp_key(user_id));

  removeItem(getCurrentSession_key(user_id));

  removeItem(getPreviousSession_Key(user_id));

  removeItem(getCurrentUserSessionID_key(user_id));
};

//--------Create composite session data

const recycleDataSession = (user_id) => {
  const currentSession_key = getCurrentSession_key(user_id);
  const currentTimestamp = Date.now();
  //Load most recent session data
  const previousSessionData = load_data(currentSession_key);
  //Save it as it is, previousSessionData
  saveItem(getPreviousSession_Key(user_id), previousSessionData);
  //Remove the old data from currentSession_key for new work
  removeItem(currentSession_key);
  //Reset currentUserSessionID
  saveItem(getCurrentUserSessionID_key(user_id), 0);
  //Reset currentSessionTimestamp
  saveItem(getCurrentSessionTimestamp_key(user_id), currentTimestamp);
};

export {
  saveItem,
  save_ps_data,
  save_currentSession_timestamp,
  save_loggedUser_data,
  load_data,
  clean_currentSession,
  recycleDataSession,
  getCurrentSession_key,
  getCurrentSessionTimestamp_key,
  getPreviousSession_Key,
  getCurrentUserSessionID_key,
  getLocalStorageSize,
};
