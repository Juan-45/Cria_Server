import { useState, useEffect } from "react";
import {
  saveItem,
  removeItem,
  getCurrentSessionTimestamp_key,
  getCurrentSession_key,
  getCurrentUserSessionID_key,
  getPreviousSession_Key,
  getLocalStorageSize,
  load_globalData,
} from "helpers/localStorage";

const Summaries = ({
  currentUser,
  sessionData,
  session_previousData,
  setGlobalData,
  filesPicker,
}) => {
  const [session_summaries, setSession_summaries] = useState(sessionData);
  const [session_previous_summaries, setSession_previous_summaries] =
    useState(session_previousData);
  const [warningData, setWarningData] = useState({
    warning: false,
    message: "",
  });
  console.log("props", sessionData, session_previousData);
  //crear estado id para session
  //crea estado de id para session_previous
  console.log("session_summaries", session_summaries);
  console.log("warningData", warningData);
  const onClickRemove = () => {
    removeItem(getCurrentSession_key(currentUser.id));
  };

  const onClickChange = () => {
    setSession_summaries({
      id: "id_summaries_2",
      list: [
        { summary1: "sumario 1", id: "id_summary_1" },
        { summary2: "sumario 2", id: "id_summary_2" },
      ],
    });
    setGlobalData((prevState) => ({
      ...prevState,
      session: {
        ...prevState.session,
        summaries: {
          id: "id_summaries_2",
          list: [
            { summary1: "sumario 1", id: "id_summary_1" },
            { summary2: "sumario 2", id: "id_summary_2" },
          ],
        },
      },
    }));
    saveItem(getCurrentSession_key(currentUser.id), {
      summaries: {
        id: "id_summaries_2",
        list: [
          { summary1: "sumario 1", id: "id_summary_1" },
          { summary2: "sumario 2", id: "id_summary_2" },
        ],
      },
    });
  };

  const onClick = () => {
    setSession_summaries({
      id: "id_summaries_1",
      list: [{ summary1: "sumario 1", id: "id_summary_1" }],
    });
    setGlobalData((prevState) => ({
      ...prevState,
      session: {
        ...prevState.session,
        summaries: {
          id: "id_summaries_1",
          list: [{ summary1: "sumario 1", id: "id_summary_1" }],
        },
      },
    }));
    saveItem(getCurrentSession_key(currentUser.id), {
      summaries: {
        id: "id_summaries_1",
        list: [{ summary1: "sumario 1", id: "id_summary_1" }],
      },
    });

    getLocalStorageSize();
  };

  //PROCESO DE GUARDADO DE ARCHIVOS YA MODIFICADOS POR APP
  //Luego de cargarse los archivos para armado de plantillas, y luego de su modificación disparar showDirectoryPicker()
  //la ventana "directory picker" se abrirá en "documents", tendra id específico al usuario actual para referenciar el directorio padre del usuer actual
  //desde ese directorio, el usuario deberá seleccionar el directorio "Servicio"
  // siempre y cuando no se haga "refresh" en la pestaña o esta no se cierre, se trabajará con el mismo "FileSystemDirectoryHandle" previamente obtenido
  //A partir de este punto la aplicación manipulará el "FileSystemDirectoryHandle":
  // Proceso automático:
  //- Verificar si E carpeta con fecha actual, si no E crearla, si E entrar
  //- Verificar si E carpeta para el hecho actual, si no E crearla-entrar-guardar archivos, si E entrar y guardar archivos

  //PROCESO DE GUARDADO DE ARCHIVOS DE SESION
  // Pedir carpeta de destino para guardar archivo si no E "FileSystemDirectoryHandle" asociado a "Backup" para el user actual,
  // siendo esta "Backup" dentro del _directorio padre_ del usuario actual

  //PROCESO DE CARGA DE ARCHIVOS BACKUP
  // Solicitar mediante showOpenFilePicker archivo backup específico, configurando este método con startIn e Id

  const onClickOpenFolderBaseMultiple = async () => {
    setWarningData({
      warning: false,
      message: "",
    });
    const files = await filesPicker({
      folder_id: "base_templates_directory",
      setWarningData,
    });
    console.log(files);
    /* try {
      //El directorio padre debe ser plano, y los subdirectorios deben tener un solo nivel con pocos archivos
      const filePicker = await window.showOpenFilePicker({
        id: "base_templates_directory",
        startIn: "documents",
        multiple: true,
      });
      // if (directoryHandle.name !== "MiDirectorio") {
       // throw new Error("Directorio no válido");
      //}

      console.log("Archivo obtenido exitosamente desde base.", filePicker);
    } catch (error) {
      console.error(error);
    }*/
  };

  const onClickOpenFolderBase2 = async () => {
    try {
      //El directorio padre debe ser plano, y los subdirectorios deben tener un solo nivel con pocos archivos
      const filePicker = await window.showOpenFilePicker({
        id: "base_templates_directory_2",
        startIn: "documents",
      });
      if (filePicker.name !== "archivo.txt") {
        console.log(`El archivo ${filePicker.name} no es válido`);
      }

      console.log("Archivo obtenido exitosamente desde base 2.", filePicker);
    } catch (error) {
      console.error(error);
    }
  };

  //crear funcion que cambie estado local session_summaries
  // cambia id de sumario puntual, id de sumarios

  //crear funcion que cambie estado local session_previous_summaries
  // cambia id de sumario puntual, id de sumarios

  //Update local states on parent state changes
  useEffect(() => {
    if (sessionData) {
      if (session_summaries) {
        if (sessionData.id !== session_summaries.id) {
          setSession_summaries(sessionData);
        }
      } else setSession_summaries(sessionData);
    }
    if (session_previousData) {
      if (session_previous_summaries) {
        if (session_previousData.id !== session_previous_summaries.id) {
          setSession_previous_summaries(session_previousData);
        }
      } else setSession_previous_summaries(session_previousData);
    }
  }, [
    sessionData,
    session_previousData,
    session_summaries,
    session_previous_summaries,
  ]);

  //Update LS after local states changes
  /*useEffect(() => {
    const current_globalData = load_globalData(currentUser.id);

    if (session_summaries) {
      if (current_globalData.session.summaries.id !== session_summaries.id) {
        saveItem(getCurrentSession_key(currentUser.id), {
          ...current_globalData.session,
          summaries: session_summaries,
          //id: nuevo id de estado para session
        });
      }
    }
    if (session_previous_summaries) {
      if (
        current_globalData.session_previous.summaries.id !==
        session_previous_summaries.id
      ) {
        saveItem(getPreviousSession_Key(currentUser.id), {
          ...current_globalData.session_previous,
          summaries: session_previous_summaries,
          //id: nuevo id de estado para session_previous
        });
      }
    }
  }, [session_summaries, session_previous_summaries, currentUser.id]);*/
  return (
    <div>
      <h1>HOME</h1>
      <button onClick={onClick}>Agregar un sumario en LS</button>
      <button onClick={onClickChange}>Agregar otro sumario en LS</button>
      <button onClick={onClickRemove}>Borrar datos session_id de LS</button>
      <button onClick={onClickOpenFolderBaseMultiple}>
        Abrir directory picker base múltiple
      </button>
      <button onClick={onClickOpenFolderBase2}>
        Abrir directory picker base 2
      </button>
    </div>
  );
};

export default Summaries;
