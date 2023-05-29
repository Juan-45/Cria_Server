import { useNavigate } from "react-router-dom";
import { deleteSessionCookie } from "helpers/cookies";

const useCloseSession = (setSessionState, currentUser) => {
  const ROOT_PATH = "/";
  const navigate = useNavigate();

  const updateSessionState = () =>
    setSessionState({
      currentUser: null,
      expiredSessionMessage: currentUser
        ? "Su sesión ha expirado, vuelva a ingresar."
        : "No ha iniciado sesión.",
    });

  const closingOnInterval = () => {
    navigate(ROOT_PATH);
    updateSessionState();
    //se borra loggedUser_data de LS
    //borrar CE de SS
    //guardar datos en archivo
  };

  const closingOnNavigation = () => {
    navigate(ROOT_PATH);
    updateSessionState();
    //se borra loggedUser_data de LS
    //borrar CE de SS
  };

  const manualClosing = () => {
    navigate(ROOT_PATH);
    setSessionState({
      currentUser: null,
      expiredSessionMessage: "",
    });
    deleteSessionCookie();
    //se borra loggedUser_data de LS
    //borrar CE de SS
  };

  return {
    closingOnInterval,
    closingOnNavigation,
    manualClosing,
  };
};

export default useCloseSession;
