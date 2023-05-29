import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ROOT_PATH = "/";
const HOME_PATH = "/summaries";
const COOKIE_NAME = "user_id";
const INTERVAL_COOKIE_VERIFICATION = 3600000;

const useCheckSession = (
  closingOnInterval,
  closingOnNavigation,
  setSessionState
) => {
  const [isRootLocation, setIsRootLocation] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const detectSessionCookie = useCallback(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === COOKIE_NAME) {
        setIsUserLogged(true);
        return true;
      }
    }
    setIsUserLogged(false);
    return false;
  }, []);

  //UseEffect on each location change
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
    const isUserLoggedIn = detectSessionCookie();

    if (isUserLoggedIn && isRoot) {
      /*  setSessionState({
        currentUser: ps_data.secretaries.find(
          (secretary) =>
            secretary.id === currentUserRequest.response.data.user_id
        ),
        expiredSessionMessage: "",
      });*/
      navigate(HOME_PATH);
    } else if (!isUserLoggedIn && !isRoot) {
      closingOnNavigation();
    }
  }, [location, navigate, detectSessionCookie, setIsRootLocation]);

  //useEffect on each interval for automatic closing
  useEffect(() => {
    let interval;

    const runInterval = () =>
      setInterval(() => {
        const isUserLoggedIn = detectSessionCookie();

        if (!isUserLoggedIn) {
          closingOnInterval();
        }
      }, INTERVAL_COOKIE_VERIFICATION);

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
  }, [isRootLocation, navigate, detectSessionCookie]);

  return {
    isUserLogged,
  };
};

export default useCheckSession;
