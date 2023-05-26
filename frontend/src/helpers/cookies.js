const COOKIE_NAME = "user_id";

const getSessionCookieValue = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === COOKIE_NAME) {
      return cookieValue;
    }
  }
};
