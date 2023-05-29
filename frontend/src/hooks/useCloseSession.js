import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSessionCookie } from "helpers/cookies";
import { clean_loggedUser_data } from "helpers/localStorage";

const useCloseSession = (setSessionState, isCurrentUser) => {
  const ROOT_PATH = "/";
  const navigate = useNavigate();

  const updateSessionState = useCallback(
    () =>
      setSessionState({
        currentUser: null,
        expiredSessionMessage: isCurrentUser
          ? "Su sesión ha expirado, vuelva a ingresar."
          : "No ha iniciado sesión.",
      }),
    [setSessionState]
  );

  const closingOnInterval = useCallback(() => {
    navigate(ROOT_PATH);
    updateSessionState();
    clean_loggedUser_data();
    //borrar CE de SS
    //guardar datos en archivo
  }, [navigate, updateSessionState, ROOT_PATH]);

  const closingOnNavigation = useCallback(() => {
    navigate(ROOT_PATH);
    updateSessionState();
    clean_loggedUser_data();
    //borrar CE de SS
  }, [navigate, updateSessionState, ROOT_PATH]);

  const closingOnNewLoginDetected = useCallback(() => {
    navigate(ROOT_PATH);
    setSessionState({
      currentUser: null,
      expiredSessionMessage: "Su sesión ha sido cerrada desde otra pestaña.",
    });
    //borrar CE de SS
    //guardar datos en archivo
  }, [navigate, setSessionState, ROOT_PATH]);

  const manualClosing = () => {
    navigate(ROOT_PATH);
    setSessionState({
      currentUser: null,
      expiredSessionMessage: "",
    });
    deleteSessionCookie();
    clean_loggedUser_data();
    //borrar CE de SS
  };

  return {
    closingOnInterval,
    closingOnNavigation,
    closingOnNewLoginDetected,
    manualClosing,
  };
};

export default useCloseSession;
