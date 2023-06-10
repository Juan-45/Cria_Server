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

  const [rootHandle, setRootHandle] = useState({
    id: "",
    handle: null,
  });

  //Select single or multiple files from referenced parent folder, return files array
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
      console.error("ERROR DE FILES_PICKER()", error);
      return null;
    }
  };

  const selectDirectory = async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker({
        startIn: "documents",
        mode: "readwrite",
      });
      return directoryHandle;
    } catch (error) {
      console.error("ERROR DE SELECT_DIRECTORY()", error);
      return null;
    }
  };

  const setRootDirectory = async () => {
    if (rootHandle.handle === null || rootHandle.id !== currentUser_id) {
      const directoryHandle = await selectDirectory();
      setRootHandle({
        id: currentUser_id,
        handle: directoryHandle,
      });
      return directoryHandle;
    } else {
      console.log("ROOT EXISTE EN ESTADO Y SE TOMA ESTE VALOR");
      return rootHandle.handle;
    }
  };

  const manage_backup_subFolder = async () => {
    const root_folder = await setRootDirectory();
    const BACKUP_SUBFOLDER_NAME = "Backup";

    if (root_folder) {
      //Get or create service subfolder
      const backup_subFolder = await root_folder.getDirectoryHandle(
        BACKUP_SUBFOLDER_NAME,
        {
          create: true,
        }
      );

      return backup_subFolder;
    } else return null;
  };

  const manage_service_filesSubFolder = async ({ filesSubFolder_name }) => {
    const root_folder = await setRootDirectory();

    const SERVICE_SUBFOLDER_NAME = "Servicio";

    if (root_folder) {
      //Get or create service subfolder
      const service_subFolder = await root_folder.getDirectoryHandle(
        SERVICE_SUBFOLDER_NAME,
        {
          create: true,
        }
      );

      //Esto deberá ser modificado con la fecha asignada al hecho, ya que
      //pueden ser la una del día siguiente y el hecho pertenecer al día anterior
      const date = new Date();

      //Current Date string for current user's service subfolder name
      const subFolderName = `${date.getDate()} - ${
        date.getMonth() + 1
      } - ${date.getFullYear()}`;

      //Get or create current date subfolder
      const currentDate_subFolder = await service_subFolder.getDirectoryHandle(
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
    } else return null;
  };

  return {
    filesPicker,
    manage_service_filesSubFolder,
    manage_backup_subFolder,
  };
};

export default useFileManager;
