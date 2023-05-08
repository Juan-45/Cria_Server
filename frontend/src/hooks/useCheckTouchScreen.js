import { useState, useEffect } from "react";

const useCheckTouchScreen = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    try {
      window.document.createEvent("TouchEvent");
      setIsTouchScreen(true);
    } catch (e) {
      setIsTouchScreen(false);
    }
  }, []);

  return { isTouchScreen };
};

export default useCheckTouchScreen;
