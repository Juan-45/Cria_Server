import { useState } from "react";
import useMemu from "hooks/useMemu";

const useSessionOptions = (manualClosing) => {
  const { handleClick, openMenu } = useMemu();
  const [openInfo, setOpenInfo] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleSave = () => {
    if (/*hay datos de sesión */ false) {
      //guardarlos
    } else {
      setOpenInfo(true);
    }
  };

  const handleLogout = () => {
    if (/*hay datos de sesión*/ true) {
      setOpenWarning(true);
    } else {
      manualClosing();
    }
  };

  const handleLogoutWithoutSaving = () => {
    console.log("solo cerrar");
    manualClosing();
    setOpenWarning(false);
  };

  const handleSaveOnLogout = () => {
    console.log("guardar y cerrar");
    //guardar datos
    manualClosing();
    setOpenWarning(false);
  };

  return {
    handleClick,
    handleSave,
    handleLogout,
    handleSaveOnLogout,
    handleLogoutWithoutSaving,
    setOpenInfo,
    setOpenWarning,
    openMenu,
    openInfo,
    openWarning,
  };
};

export default useSessionOptions;
