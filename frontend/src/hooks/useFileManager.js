import { useState } from "react";

const useFileManager = ({ currentUser_id }) => {
  const [backupHandle, setBackupHandle] = useState({
    id: "",
    handle: null,
  });
  const [serviceHandle, setServiceHandle] = useState({
    id: "",
    handle: null,
  });

  //selección de archivos para cargar backup, o templates de base, involucrados, etc
  const filesPicker = async ({
    setWarningData = () => {},
    files_folder_reference,
    onlyWord = true,
    onlyBackup = false,
  }) => {
    const areFilesInvalid = (files) => {
      for (let i = 0; i < files.length; i++) {
        const fileExtension = files[i].name.split(".")[1];

        const templatesCondition = onlyWord
          ? fileExtension !== "docx"
          : fileExtension !== "docx" && fileExtension !== "xlsx";
        const invalidationCondition = onlyBackup
          ? fileExtension !== "backup"
          : templatesCondition;

        if (files[i].kind !== "file" || invalidationCondition) {
          return true;
        }
      }
      return false;
    };

    const getSettings = () => {
      if (!onlyBackup) {
        if (onlyWord) {
          return {
            multiple: true,
            types: [
              {
                description: "Plantillas .docx",
                accept: {
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [".docx"],
                },
              },
            ],
          };
        } else {
          return {
            multiple: true,
            types: [
              {
                description: "Plantillas .docx y/o .xlsx",
                accept: {
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [".docx"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [".xlsx"],
                },
              },
            ],
          };
        }
      } else {
        //return backup settings
      }
    };

    try {
      const files = await window.showOpenFilePicker({
        id: files_folder_reference,
        startIn: "documents",
        ...getSettings(),
      });

      if (areFilesInvalid(files)) {
        setWarningData({
          warning: true,
          message: `No ha seleccionado un archivo ${
            onlyBackup ? ".backup" : onlyWord ? ".docx" : ".docx y/o .xlsx"
          } válido.`,
        });
        return null;
      }
      return files;
    } catch (error) {
      console.error("ERROR DE FILESPICKER()", error);
      return null;
    }
  };

  const selectDirectory = async ({ parent_folder_reference }) => {
    try {
      const directoryHandle = await window.showDirectoryPicker({
        id: parent_folder_reference,
        startIn: "documents",
        mode: "readwrite",
      });
      return directoryHandle;
    } catch (error) {
      console.error("ERROR DE SELECTDIRECTORY()", error);
      return null;
    }
  };

  //From referenced parent folder, select "service folder" manually return handle and store it in state
  const setServiceDirectory = async () => {
    const currentUser_reference_id = `rootDirectory_${currentUser_id}`;
    console.log("SERVICE HANDLE ANTES DE CONDICIONAL", serviceHandle);
    if (serviceHandle.handle === null || serviceHandle.id !== currentUser_id) {
      const directoryHandle = await selectDirectory({
        parent_folder_reference: currentUser_reference_id,
      });
      console.log("EJECUCIÓN DENTRO DEL CONDICIONAL");
      setServiceHandle({
        id: currentUser_id,
        handle: directoryHandle,
      });
      // setServiceHandle("test");

      return directoryHandle;
    } else {
      console.log("EJECUCIÓN FUERA DEL CONDICIONAL");
      return serviceHandle.handle;
    }
  };
  console.log("SERVICE HANDLE DURANTE RENDER:", serviceHandle);
  //From referenced parent folder, select "buckup folder" manually return handle and store it in state
  const setBackupDirectory = async () => {
    const currentUser_reference_id = `backupDirectory_${currentUser_id}`;
    console.log("backupHandle State", backupHandle);
    if (backupHandle.handle === null || backupHandle.id !== currentUser_id) {
      const directoryHandle = await selectDirectory({
        parent_folder_reference: currentUser_reference_id,
      });

      setBackupHandle({
        id: currentUser_id,
        handle: directoryHandle,
      });

      return directoryHandle;
    } else {
      return backupHandle.handle;
    }
  };

  //From serviceHandle verify if current date subfolder exists, if not, create it, then
  //verify if files subfolder exists, if not, create it, then return files subfolder handle
  const manageServiceSubFolders = async ({
    serviceHandle,
    filesSubFolder_name,
  }) => {
    //probar con crear una carpeta que no existe, y luego crear una carpeta de prueba dentro
    const date = new Date();

    //Current Date string for current user's service subfolder name
    const subFolderName = `${date.getDate()} - ${
      date.getMonth() + 1
    } - ${date.getFullYear()}`;

    //Get or create current date subfolder
    const currentDate_subFolder = await serviceHandle.getDirectoryHandle(
      subFolderName,
      {
        create: true,
      }
    );

    //Get or create files subfolder
    const files_subFolder = await currentDate_subFolder.getDirectoryHandle(
      filesSubFolder_name,
      { create: true }
    );

    return files_subFolder;
  };

  return {
    filesPicker,
    setServiceDirectory,
    setBackupDirectory,
    manageServiceSubFolders,
    backupHandle,
    serviceHandle,
  };
};

export default useFileManager;
