import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  load_globalData,
  getCurrentSession_key,
  getPreviousSession_Key,
  save_session,
  save_previousSession,
  getLocalStorageSize,
} from "helpers/localStorage";
import { saveItem } from "../helpers/localStorage";

const ROOT_PATH = "/";
const SESSION_TYPE = "/sessionType";

/*const TEST_SESSION_SUMMARIES = {
  id: "123456789",
  list: [
    {
      summary_by: "Departamento de Policía",
      ipp: "",
      victims: "Juan Pérez, María Gómez, Carlos Ramírez",
      complainants: "María Gómez, Carlos Ramírez, Juan Pérez, Laura Torres",
      causants: "Desconocido",
      accuseds: "Ninguno",
      id: Math.random().toString(36).substring(7),
    },
      {
      summary_by: "Fiscalía General",
      ipp: "987654321",
      victims: "Ana Rodríguez",
      complainants: "Pedro López",
      causants: "Carlos Ramírez",
      accused: "Carlos Ramírez",
      id: Math.random().toString(36).substring(7),
    },
  ],
};*/
/*  {
      summary_by: "Policía Local",
      ipp: "456123789",
      victims: "Laura Torres",
      complainants: "Andrés Martínez",
      causants: "Desconocido",
      accused: "Ninguno",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Guardia Civil",
      ipp: "789123456",
      victims: "Roberto Silva",
      complainants: "Carmen Sánchez",
      causants: "María González",
      accused: "María González",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 1",
      ipp: "IPP 1",
      victims: "Víctima 1",
      complainants: "Denunciante 1",
      causants: "Causante 1",
      accused: "Imputado 1",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 2",
      ipp: "IPP 2",
      victims: "Víctima 2",
      complainants: "Denunciante 2",
      causants: "Causante 2",
      accused: "Imputado 2",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 3",
      ipp: "IPP 3",
      victims: "Víctima 3",
      complainants: "Denunciante 3",
      causants: "Causante 3",
      accused: "Imputado 3",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 4",
      ipp: "IPP 4",
      victims: "Víctima 4",
      complainants: "Denunciante 4",
      causants: "Causante 4",
      accused: "Imputado 4",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 5",
      ipp: "IPP 5",
      victims: "Víctima 5",
      complainants: "Denunciante 5",
      causants: "Causante 5",
      accused: "Imputado 5",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 6",
      ipp: "IPP 6",
      victims: "Víctima 6",
      complainants: "Denunciante 6",
      causants: "Causante 6",
      accused: "Imputado 6",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 7",
      ipp: "IPP 7",
      victims: "Víctima 7",
      complainants: "Denunciante 7",
      causants: "Causante 7",
      accused: "Imputado 7",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 8",
      ipp: "IPP 8",
      victims: "Víctima 8",
      complainants: "Denunciante 8",
      causants: "Causante 8",
      accused: "Imputado 8",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 9",
      ipp: "IPP 9",
      victims: "Víctima 9",
      complainants: "Denunciante 9",
      causants: "Causante 9",
      accused: "Imputado 9",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 10",
      ipp: "IPP 10",
      victims: "Víctima 10",
      complainants: "Denunciante 10",
      causants: "Causante 10",
      accused: "Imputado 10",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 11",
      ipp: "IPP 11",
      victims: "Víctima 11",
      complainants: "Denunciante 11",
      causants: "Causante 11",
      accused: "Imputado 11",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 12",
      ipp: "IPP 12",
      victims: "Víctima 12",
      complainants: "Denunciante 12",
      causants: "Causante 12",
      accused: "Imputado 12",
      id: Math.random().toString(36).substring(7),
    },
  ],
};*/

const TEST_SESSION_PREVIOUS_SUMMARIES = {
  id: "987456321",
  list: [
    {
      summary_by: "Agencia 1",
      ipp: "IPP 1",
      victims: "Víctima 1",
      complainants: "Denunciante 1",
      causants: "Causante 1",
      accuseds: "Imputado 1",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 2",
      ipp: "IPP 2",
      victims: "Víctima 2",
      complainants: "Denunciante 2",
      causants: "Causante 2",
      accuseds: "Imputado 2",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 3",
      ipp: "IPP 3",
      victims: "Víctima 3",
      complainants: "Denunciante 3",
      causants: "Causante 3",
      accuseds: "Imputado 3",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 4",
      ipp: "IPP 4",
      victims: "Víctima 4",
      complainants: "Denunciante 4",
      causants: "Causante 4",
      accuseds: "Imputado 4",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 5",
      ipp: "IPP 5",
      victims: "Víctima 5",
      complainants: "Denunciante 5",
      causants: "Causante 5",
      accuseds: "Imputado 5",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 6",
      ipp: "IPP 6",
      victims: "Víctima 6",
      complainants: "Denunciante 6",
      causants: "Causante 6",
      accuseds: "Imputado 6",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 7",
      ipp: "IPP 7",
      victims: "Víctima 7",
      complainants: "Denunciante 7",
      causants: "Causante 7",
      accuseds: "Imputado 7",
      id: Math.random().toString(36).substring(7),
    },
    {
      summary_by: "Agencia 8",
      ipp: "IPP 8",
      victims: "Víctima 8",
      complainants: "Denunciante 8",
      causants: "Causante 8",
      accuseds: "Imputado 8",
      id: Math.random().toString(36).substring(7),
    },
  ],
};

const useGlobalData = ({ currentUser_id }) => {
  const { pathname } = useLocation();

  useMemo(() => {
    if (currentUser_id) {
      console.log("ACTUALIZACIÓN LS MOCKED-UP");
      /* saveItem(getCurrentSession_key(currentUser_id), {
        summaries: TEST_SESSION_SUMMARIES,
      });*/
      saveItem(getPreviousSession_Key(currentUser_id), {
        summaries: TEST_SESSION_PREVIOUS_SUMMARIES,
      });
      console.log("TAMAÑO LS:", getLocalStorageSize());
    }
  }, [currentUser_id]);

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
                ? prevState.session.summaries
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
      console.log("CAMBIO EN LS DESDE OTRA TAB");
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
