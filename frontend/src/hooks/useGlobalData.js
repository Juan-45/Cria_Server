import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  load_globalData,
  getCurrentSession_key,
  getPreviousSession_Key,
} from "helpers/localStorage";

const ROOT_PATH = "/";
const SESSION_TYPE = "/sessionType";

const useGlobalData = ({ currentUser_id }) => {
  const { pathname } = useLocation();

  const [globalData, setGlobalData] = useState({
    session: null,
    session_previous: null,
  });

  // State initialization
  useEffect(() => {
    if (pathname !== ROOT_PATH && pathname !== SESSION_TYPE) {
      if (
        (globalData.session === null &&
          load_globalData(currentUser_id).session !== null) ||
        (globalData.session_previous === null &&
          load_globalData(currentUser_id).session_previous !== null)
      ) {
        setGlobalData(load_globalData(currentUser_id));
      }
    }
  }, [
    pathname,
    ROOT_PATH,
    SESSION_TYPE,
    currentUser_id,
    setGlobalData,
    load_globalData,
    globalData,
  ]);

  // Event listener for changes in localStorage from other tabs
  useEffect(() => {
    const handleStorageChanges = (event) => {
      if (
        event.key === getCurrentSession_key(currentUser_id) &&
        event.newValue !== null
      ) {
        setGlobalData((prevState) => ({
          ...prevState,
          session: JSON.parse(event.newValue),
        }));
      }

      if (
        event.key === getPreviousSession_Key(currentUser_id) &&
        event.newValue !== null
      ) {
        setGlobalData((prevState) => ({
          ...prevState,
          session_previous: JSON.parse(event.newValue),
        }));
      }
    };
    if (pathname !== ROOT_PATH && pathname !== SESSION_TYPE) {
      window.addEventListener("storage", handleStorageChanges);
      return () => {
        window.removeEventListener("storage", handleStorageChanges);
      };
    }
  }, [
    pathname,
    ROOT_PATH,
    SESSION_TYPE,
    currentUser_id,
    globalData,
    setGlobalData,
  ]);

  return { globalData, setGlobalData };
};

export default useGlobalData;
