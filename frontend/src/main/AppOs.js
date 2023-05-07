import axios from "axios";
import { useState } from "react";

const AppOs = () => {
  const [sessionLogged, setSessionLogged] = useState(false);
  const requestCookie = () =>
    axios
      .post(
        "/",
        { name: "Juan" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) {
        console.log("session_id ENCONTRADA", true);
        // return cookieValue;
        return setSessionLogged(true);
      }
    }
    //return null;
    return setSessionLogged(false);
  };
  console.log("sessionLogged", sessionLogged);
  return (
    <div>
      <h1>App OS</h1>
      <button onClick={requestCookie}>Solicitar cookie de sesión</button>
      <button onClick={() => getCookie("session_id")}>Obtener cookie</button>

      {sessionLogged ? (
        <h2>Cookie de sesión encontrada</h2>
      ) : (
        <h2>Cookie de sesión no encontrada</h2>
      )}
    </div>
  );
};

export default AppOs;
