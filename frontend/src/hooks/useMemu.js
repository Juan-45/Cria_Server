import { useState, useEffect, useRef } from "react";

const useMemu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    menuRef.current = event.currentTarget;
    setOpenMenu(!openMenu);
  };

  //This event listener detect click event also in the list menu items, so it automatically closes the menu
  //The valid events are those who are not inside the menu
  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return {
    handleClick,
    setOpenMenu,
    openMenu,
  };
};

export default useMemu;
