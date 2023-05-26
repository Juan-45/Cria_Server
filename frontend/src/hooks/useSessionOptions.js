import { useState, useEffect } from "react";

const useSessionOptions = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpenMenu(!openMenu);
  };

  const handleSave = () => {
    if (/*hay datos de sesión */ false) {
      //guardarlos
    } else {
      setOpenInfo(true);
    }
    setOpenMenu(false);
  };

  const handleLogout = () => {
    if (/*hay datos de sesión*/ true) {
      setOpenWarning(true);
    } else {
      //Cerrar sesión
    }
    setOpenMenu(false);
  };

  const handleLogoutWithoutSaving = () => {
    console.log("cerrar sesión");
    setOpenWarning(false);
  };

  const handleSaveOnLogout = () => {
    console.log("guardar y cerrar sesión");
    setOpenWarning(false);
  };

  useEffect(() => {
    const closeMenu = () => setOpenMenu(false);
    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
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
