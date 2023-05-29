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

const deleteSessionCookie = () => {
  const name = COOKIE_NAME;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export { getSessionCookieValue, deleteSessionCookie };
