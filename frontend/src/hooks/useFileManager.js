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
    folder_id,
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
        id: folder_id,
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
      console.error(error);
      return null;
    }
  };
  return { filesPicker };
};

export default useFileManager;
