import { Deflate, Inflate } from "pako";
import { useState, useMemo } from "react";

const useLocalStorage = () => {
  const [errorData, setErrorData] = useState({ error: false });
  const inflate = useMemo(() => new Inflate(), []);
  const deflate = useMemo(() => new Deflate(), []);

  const getLocalStorageSize = () => {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const itemSize = new Blob([value]).size;
      totalSize += itemSize;
    }
    return `${totalSize} Kb`;
  };

  const getLocalStorageItemSize = (key) => {
    const item = localStorage.getItem(key);
    const itemSize = new Blob([item]).size / 1000;
    return `${itemSize} Kb`;
  };

  /*
//manejar errores
//capturar excepciones de setItem, puede lanzar una excepción si el almacén esta lleno


localStorage.setItem('miGato', 'Juan');

La sintaxis para leer el ítem almacenado en localStorage es la siguiente:
var cat = localStorage.getItem('miGato');

La sintaxis para eliminar el ítem almacenado en localStorage es la siguiente:
localStorage.removeItem('miGato');

La sintaxis para eliminar todos los ítems almacenados en localStorage es la siguiente:
// Elimina todos los elementos
localStorage.clear();
*/

  const saveItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      //Ocurre cuando el almacenamiento local está lleno
      //Este es un error que no se debería alcanzar con la correcta gestión de LS
      console.log("Error saving item to localStorage", e);
    }
  };

  const loadItem = (key) => {
    const item = localStorage.getItem(key);
    //Si item es null, no existe en LS
    return item;
  };

  const removeItem = (key) => localStorage.removeItem(key);

  //-----------------pako data compression helper functions

  const compress = (data) => {
    const compressedData = deflate(JSON.stringify(data));
    return compressedData;
  };

  const decompress = (
    compressedData,
    onErrorRequestToServer,
    onError = () => {}
  ) => {
    const decompressedData = JSON.parse(
      inflate(compressedData, { to: "string" })
    );
    //Verificar según el caso si es necesario resetear setErrorData
    const title = onErrorRequestToServer
      ? "Ocurrió un error al descomprimir datos. Se solicitarán nuevamente al servidor."
      : "Ocurrió un error al descomprimir datos. Podrá intentar recuperarlos mediante archivo.";

    if (inflate.err) {
      setErrorData({
        title,
        message: inflate.msg,
        error: true,
      });
      /*
      Callback para volver a solicitar datos al server, o si ocurre con datos de inspecciones o 
        sumarios callback para solicitar archivo correspondiente
      */
      onError();
    } else return decompressedData;
  };

  return {
    decompress,
    compress,
    simulateErr,
    errorData,
  };
};
export default useLocalStorage;
