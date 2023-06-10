import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSessionCookie } from "helpers/cookies";
import { clean_loggedUser_data } from "helpers/localStorage";

const useCloseSession = (setSessionState, setGlobalData, isCurrentUser) => {
  const ROOT_PATH = "/";
  const navigate = useNavigate();

  const updateSessionState = useCallback(() => {
    setSessionState({
      currentUser: null,
      expiredSessionMessage: isCurrentUser
        ? "Su sesión ha expirado, vuelva a ingresar."
        : "No ha iniciado sesión.",
    }),
      setGlobalData({
        session: null,
        session_previous: null,
      });
  }, [setSessionState, setGlobalData, isCurrentUser]);

  const closingOnInterval = useCallback(() => {
    navigate(ROOT_PATH);
    updateSessionState();
    clean_loggedUser_data();
    //borrar CE de SS
  }, [navigate, updateSessionState, ROOT_PATH]);

  const closingOnNavigation = useCallback(() => {
    navigate(ROOT_PATH);
    updateSessionState();
    clean_loggedUser_data();
    //borrar CE de SS
  }, [navigate, updateSessionState, ROOT_PATH]);

  const handleCloseFromOtherTab = useCallback(() => {
    navigate(ROOT_PATH);
    setSessionState({
      currentUser: null,
      expiredSessionMessage: "Su sesión ha sido cerrada desde otra pestaña.",
    });
    setGlobalData({
      session: null,
      session_previous: null,
    });
    //borrar CE de SS
  }, [navigate, setSessionState, ROOT_PATH, setGlobalData]);

  const manualClosing = () => {
    navigate(ROOT_PATH);
    setSessionState({
      currentUser: null,
      expiredSessionMessage: "",
    });
    setGlobalData({
      session: null,
      session_previous: null,
    });
    deleteSessionCookie();
    clean_loggedUser_data();
    //borrar CE de SS
  };

  return {
    closingOnInterval,
    closingOnNavigation,
    handleCloseFromOtherTab,
    manualClosing,
  };
};

export default useCloseSession;
