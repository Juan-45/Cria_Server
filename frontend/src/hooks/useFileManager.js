import { useState, useCallback } from "react";
import { getUpdatedBlobForTemplates } from "helpers/docxtemplaterTools";
import {
  load_data,
  getPreviousSession_Key,
  getCurrentSessionTimestamp_key,
  getPreviousSessionToSaveCondition,
} from "helpers/localStorage";

const useFileManager = () => {
  const [rootHandle, setRootHandle] = useState(null);

  //Select single or multiple files from referenced parent folder, return files array
  const filesPicker = useCallback(
    async ({
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
            ? fileExtension !== "json"
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
          return {
            multiple: false,
            types: [
              {
                description: "Archivos de backup .json",
                accept: { "application/json": [".json"] },
              },
            ],
          };
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
            title: "Extensión de archivo inválida",
            message: `No ha seleccionado un archivo ${
              onlyBackup ? ".json" : onlyWord ? ".docx" : ".docx y/o .xlsx"
            } válido.`,
            withOptions: false,
          });
          return null;
        }
        return files;
      } catch (error) {
        console.error("ERROR DE FILES_PICKER()", error);
        return null;
      }
    },
    []
  );

  const selectDirectory = useCallback(async () => {
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
  }, []);

  const setRootDirectory = useCallback(async () => {
    if (rootHandle === null) {
      const directoryHandle = await selectDirectory();
      setRootHandle(directoryHandle);
      return directoryHandle;
    } else {
      //  console.log("ROOT EXISTE EN ESTADO Y SE TOMA ESTE VALOR");
      return rootHandle;
    }
  }, [rootHandle, selectDirectory]);

  const getCurrentDate_subFolder = useCallback(async (initialFolder_handle) => {
    //Esto deberá ser modificado con la fecha asignada al hecho, ya que
    //pueden ser la una del día siguiente y el hecho pertenecer al día anterior
    const date = new Date();

    //Current Date string for current user's service subfolder name
    const subFolderName = `${date.getDate()} - ${
      date.getMonth() + 1
    } - ${date.getFullYear()}`;

    //Get or create current date subfolder
    const currentDate_subFolder = await initialFolder_handle.getDirectoryHandle(
      subFolderName,
      {
        create: true,
      }
    );
    return currentDate_subFolder;
  }, []);

  const manage_backup_subFolder = useCallback(async () => {
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
  }, [setRootDirectory]);

  const manage_service_filesSubFolder = useCallback(
    async ({ filesSubFolder_name, optional_inner_subFolder }) => {
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

        //Get or create current date subfolder: day of work
        const currentDate_subFolder = await getCurrentDate_subFolder(
          service_subFolder
        );

        //Get or create files subfolder: ./"Actuaciones por X" ./Recorridas ./Actas de calabozos
        const files_subFolder = await currentDate_subFolder.getDirectoryHandle(
          filesSubFolder_name,
          { create: true }
        );

        //Get or create optional inner subfolder of files subfolder: ./"Involucrado X" ./"Vehículo X"
        if (optional_inner_subFolder) {
          //Get or create optional inner subfolder of files subfolder
          const inner_subFolder = await files_subFolder.getDirectoryHandle(
            optional_inner_subFolder,
            { create: true }
          );

          return inner_subFolder;
        }

        return files_subFolder;
      } else return null;
    },
    [setRootDirectory, getCurrentDate_subFolder]
  );

  const saveBlobAsFile = useCallback(
    async ({ directoryHandle, fileName, blob }) => {
      // console.log("Nombre del archivo", fileName);
      try {
        const fileHandle = await directoryHandle.getFileHandle(fileName, {
          create: true,
        });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (error) {
        console.error("Error al guardar el archivo:", error);
      }
    },
    []
  );

  const itinerateFilesHandle = useCallback(
    async ({ filesHandle, directoryHandle, data, onlyWord }) => {
      filesHandle.forEach(async (fileHandle) => {
        const fileName = fileHandle.name.split(".")[0];

        const updatedBlob = await getUpdatedBlobForTemplates({
          fileHandle,
          data,
          onlyWord,
        });

        saveBlobAsFile({
          directoryHandle,
          fileName: `${fileName}.docx`,
          blob: updatedBlob,
        });
      });
    },
    [saveBlobAsFile]
  );

  const onlyWord = true;

  const getSummaryFiles = useCallback(
    async ({
      setWarningData,
      summaryFolderName,
      optional_inner_subFolder,
      data,
      folder_reference,
    }) => {
      const filesHandle = await filesPicker({
        setWarningData,
        files_folder_reference: folder_reference,
        onlyWord: onlyWord,
      });

      const directoryHandle = await manage_service_filesSubFolder({
        filesSubFolder_name: summaryFolderName,
        optional_inner_subFolder: optional_inner_subFolder,
      });

      /* console.log("ARCHIVOS VEHÍCULOS SELECCIONADOS:", {
      filesHandle,
      directoryHandle,
    });*/

      if (directoryHandle && filesHandle) {
        //console.log("HAY CARPETA SELECCIONADA");
        itinerateFilesHandle({
          filesHandle,
          directoryHandle,
          data,
          onlyWord: onlyWord,
        });
      }
    },
    [filesPicker, manage_service_filesSubFolder, itinerateFilesHandle, onlyWord]
  );

  const createBlobFromJSON = useCallback((data) => {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: "application/json" });
    return blob;
  }, []);

  const saveBackup = useCallback(
    async ({ currentUserId /*, dateNow */ }) => {
      const directoryHandle = await manage_backup_subFolder();

      const currentTimestamp = load_data(
        getCurrentSessionTimestamp_key(currentUserId)
      );

      const formatDateFromTimestamp = (timestamp) => {
        const date = new Date(Number(timestamp));
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}-${month}-${year}`;
      };

      const saveFile = ({ data, fileName }) => {
        const blob = createBlobFromJSON(data);
        saveBlobAsFile({
          directoryHandle: directoryHandle,
          fileName: `${fileName}.json`,
          blob: blob,
        });
      };

      /*  if (getSessionToSaveCondition(currentUserId)) {
        const sessionData = load_data(getCurrentSession_key(currentUserId));

        saveFile({
          data: { ...sessionData, creationTimestamp: currentTimestamp },
          fileName: `${formatDateFromTimestamp(
            currentTimestamp
          )} a ${formatDateFromTimestamp(dateNow)}`,
        });
      }*/

      if (getPreviousSessionToSaveCondition(currentUserId)) {
        const previous_session = load_data(
          getPreviousSession_Key(currentUserId)
        );

        saveFile({
          data: previous_session,
          fileName: `${formatDateFromTimestamp(
            previous_session.creationTimestamp
          )} a ${formatDateFromTimestamp(currentTimestamp)}`,
        });
      }
    },
    [manage_backup_subFolder, saveBlobAsFile, createBlobFromJSON]
  );

  return {
    getSummaryFiles,
    saveBackup,
    filesPicker,
  };
};

export default useFileManager;
