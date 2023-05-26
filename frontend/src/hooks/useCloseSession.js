import { useNavigate } from "react-router-dom";

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
    //borrar CE de SS
    //guardar datos en archivo
  };

  const closingOnNavigation = () => {
    navigate(ROOT_PATH);
    updateSessionState();
    //borrar CE de SS
  };

  // closingManual

  return {
    closingOnInterval,
    closingOnNavigation,
  };
};

export default useCloseSession;
