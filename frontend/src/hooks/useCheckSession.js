import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useCheckSession = () => {
  const [isRootLocation, setIsRootLocation] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const ROOT_PATH = "/";
  const HOME_PATH = "/home";
  const _404_PATH = "/404";
  const COOKIE_NAME = "session_id";
  const COOKIE_VERIFICATION_INTERVAL = 6000;

  const detectSessionCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const detectRootLocation = () => {
      if (location.pathname === ROOT_PATH) {
        setIsRootLocation(true);
        return true;
      } else {
        setIsRootLocation(false);
        return false;
      }
    };

    const isRoot = detectRootLocation();
    const isUserLoggedIn = detectSessionCookie(COOKIE_NAME);

    if (isRoot && isUserLoggedIn) {
      navigate(HOME_PATH);
    } else if (
      !isRoot &&
      !isUserLoggedIn /*&& !location.pathname === _404_PATH*/
    ) {
      navigate(ROOT_PATH);
    }
  }, [location]);

  useEffect(() => {
    let interval;

    const runInterval = () =>
      setInterval(() => {
        console.log(
          `Han pasado ${COOKIE_VERIFICATION_INTERVAL / 1000} segundos!`
        );
        const isUserLoggedIn = detectSessionCookie(COOKIE_NAME);

        if (!isUserLoggedIn) {
          navigate(ROOT_PATH);
        }
      }, COOKIE_VERIFICATION_INTERVAL);

    if (!isRootLocation) {
      interval = runInterval();

      const resetInterval = () => {
        clearInterval(interval);
        interval = runInterval();
      };

      document.addEventListener("click", resetInterval);
      document.addEventListener("mousemove", resetInterval);
      document.addEventListener("keydown", resetInterval);

      return () => {
        clearTimeout(interval);
        document.removeEventListener("click", resetInterval);
        document.removeEventListener("mousemove", resetInterval);
        document.removeEventListener("keydown", resetInterval);
      };
    }
  }, [isRootLocation, COOKIE_VERIFICATION_INTERVAL]);

  return {
    isRootLocation,
  };
};

export default useCheckSession;
