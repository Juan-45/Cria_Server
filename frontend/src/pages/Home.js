import {
  saveItem,
  getCurrentSessionTimestamp_key,
  getCurrentSession_key,
  getCurrentUserSessionID_key,
  getLocalStorageSize,
} from "helpers/localStorage";

const Home = ({ currentUser }) => {
  // boton para guardar datos en LS + id + timestamp-

  const onClick = () => {
    saveItem(
      getCurrentSession_key(currentUser.id),
      "DATOS_DE_LA_SESION_ACTUAL"
    );
    saveItem(
      getCurrentSessionTimestamp_key(currentUser.id),
      JSON.stringify(Date.now())
    );
    saveItem(
      getCurrentUserSessionID_key(currentUser.id),
      "ID_DE_LA_SESION_ACTUAL"
    );
    getLocalStorageSize();
  };

  return (
    <>
      <h1>HOME</h1>

      <button onClick={onClick}>Guardar datos en LS</button>
    </>
  );
};

export default Home;
