import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  load_globalData,
  loadItem,
  saveItem,
  getCurrentSessionTimestamp_key,
  getCurrentSession_key,
  getPreviousSession_Key,
  save_session,
  save_previousSession,
} from "helpers/localStorage";

const ROOT_PATH = "/";
const SESSION_TYPE = "/sessionType";

const useGlobalData = ({ currentUser_id }) => {
  const { pathname } = useLocation();

  const [globalData, setGlobalData] = useState({
    session: null,
    session_previous: null,
  });

  const updateSessionSummaries = useCallback(
    (newSummaries_callback) => {
      setGlobalData((prevState) => {
        const updatedState = {
          ...prevState,
          session: {
            ...prevState.session,
            summaries: newSummaries_callback(
              prevState.session
                ? prevState.session.summaries
                : { id: "", list: [] }
            ),
          },
        };
        save_session(currentUser_id, updatedState.session);
        return updatedState;
      });
      if (!loadItem(getCurrentSessionTimestamp_key(currentUser_id))) {
        saveItem(getCurrentSessionTimestamp_key(currentUser_id), Date.now());
      }
    },
    [currentUser_id]
  );

  const updatePreviousSessionSummaries = useCallback(
    (newSummaries_callback) => {
      setGlobalData((prevState) => {
        const updatedState = {
          ...prevState,
          session_previous: {
            ...prevState.session_previous,
            summaries: newSummaries_callback(
              prevState.session_previous
                ? prevState.session_previous.summaries
                : { id: "", list: [] }
            ),
          },
        };
        save_previousSession(currentUser_id, updatedState.session_previous);
        return updatedState;
      });
    },
    [currentUser_id]
  );

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
  }, [pathname, currentUser_id, setGlobalData, globalData]);

  // Event listener for changes in localStorage from other tabs
  useEffect(() => {
    const handleStorageChanges = (event) => {
      // console.log("CAMBIO EN LS DESDE OTRA TAB");
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
  }, [pathname, currentUser_id, globalData, setGlobalData]);

  return {
    globalData,
    setGlobalData,
    updateSessionSummaries,
    updatePreviousSessionSummaries,
  };
};

export default useGlobalData;
