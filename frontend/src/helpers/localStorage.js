//LocalStorage Size helper functions

const getLocalStorageSize = () => {
  let totalSize = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const itemSize = new Blob([value]).size / 1000;
    totalSize += itemSize;
  }
  console.log("Total LS Size (Kb):", totalSize);
};

const getLocalStorageItemSize = (key) => {
  const item = localStorage.getItem(key);
  const itemSize = new Blob([item]).size / 1000;
  console.log(`Item ${key} size: ${itemSize} Kb`);
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

//--------Get localStorage keys

const getCurrentSessionTimestamp_key = (user_id) =>
  `session_${user_id}_timestamp`;

const getCurrentSession_key = (user_id) => `session_${user_id}`;

const getPreviousSession_Key = (user_id) => `session_${user_id}_previous`;

//
const getCurrentUserSessionID_key = (user_id) => `session_${user_id}_ID`;
//

//--------Load data from localStorage
const load_data = (key) => {
  const data = loadItem(key);
  if (data) {
    return data;
  } else return null;
};

const load_globalData = (user_id) => {
  return {
    session: load_data(getCurrentSession_key(user_id)),
    session_previous: load_data(getPreviousSession_Key(user_id)),
  };
};

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

const save_session = (user_id, session) => {
  saveItem(getCurrentSession_key(user_id), session);
};

const save_previousSession = (user_id, previous_session) => {
  saveItem(getPreviousSession_Key(user_id), previous_session);
};

//--------Clean localStorage for currentUser
const clean_currentUser_data = (user_id) => {
  removeItem(getCurrentSessionTimestamp_key(user_id));

  removeItem(getCurrentSession_key(user_id));

  removeItem(getPreviousSession_Key(user_id));

  removeItem(getCurrentUserSessionID_key(user_id));
};

//--------Create composite session data

const recycleDataSession = (user_id) => {
  const currentSession_key = getCurrentSession_key(user_id);
  const currentTimestamp = Date.now();
  //Load most recent session data, in this context is > 30 hs
  const oldSessionData = load_data(currentSession_key);
  //Get timestamp from previous session
  const oldSessionTimestamp = load_data(
    getCurrentSessionTimestamp_key(user_id)
  );
  //Save it as previous_session, oldSessionData
  saveItem(getPreviousSession_Key(user_id), {
    ...oldSessionData,
    creationTimestamp: oldSessionTimestamp,
  });
  //Remove the old data from currentSession_key for new work
  removeItem(currentSession_key);
  //Reset currentUserSessionID
  //saveItem(getCurrentUserSessionID_key(user_id), 0);
  //Reset currentSessionTimestamp
  saveItem(getCurrentSessionTimestamp_key(user_id), currentTimestamp);
};

// Clean loggedUser_data

const clean_loggedUser_data = () => removeItem("loggedUser_data");

const getPreviousSessionToSaveCondition = (user_id) => {
  const condition =
    load_data(getPreviousSession_Key(user_id)) &&
    load_data(getPreviousSession_Key(user_id)).summaries.list.length > 0;
  //TODO: A futuro agregar condicional para actas de calabozos
  return condition;
};

const getSessionToSaveCondition = (user_id) => {
  const condition =
    load_data(getCurrentSession_key(user_id)) &&
    load_data(getCurrentSession_key(user_id)).summaries.list.length > 0;
  //TODO: A futuro agregar condicional para actas de calabozos
  return condition;
};

export {
  saveItem,
  loadItem,
  save_ps_data,
  save_currentSession_timestamp,
  save_loggedUser_data,
  save_session,
  save_previousSession,
  load_data,
  load_globalData,
  clean_loggedUser_data,
  clean_currentUser_data,
  recycleDataSession,
  getCurrentSession_key,
  getCurrentSessionTimestamp_key,
  getPreviousSession_Key,
  getCurrentUserSessionID_key,
  getLocalStorageSize,
  removeItem,
  getPreviousSessionToSaveCondition,
  getSessionToSaveCondition,
};
