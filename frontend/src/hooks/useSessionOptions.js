import { useState } from "react";
import useMemu from "hooks/useMemu";
import {
  getPreviousSessionToSaveCondition,
  save_previousSession,
} from "helpers/localStorage";

const useSessionOptions = ({
  manualClosing,
  currentUserId,
  saveBackup,
  filesPicker,
  setGlobalData,
}) => {
  const { handleClick, openMenu } = useMemu();
  const [openInfo, setOpenInfo] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [fileWarning, setFileWarning] = useState({
    warning: false,
    title: "",
    message: "",
    withOptions: true,
  });
  const [backupData, setBackupData] = useState(null);

  const loadBackupData = (backupData) => {
    setGlobalData((prevstate) => ({
      ...prevstate,
      session_previous: backupData,
    }));
    save_previousSession(currentUserId, backupData);
  };

  const handleLoad = async () => {
    const existPreviousSessionData =
      getPreviousSessionToSaveCondition(currentUserId);

    //If file extension is wrong, withOptions is false and the file is not loaded
    const backup_file_handle = await filesPicker({
      setWarningData: setFileWarning,
      files_folder_reference: `backup_${currentUserId}`,
      onlyBackup: true,
    });

    if (backup_file_handle[0]) {
      const backup_file = await backup_file_handle[0].getFile();
      const contents = await backup_file.text();
      const backup_data = JSON.parse(contents);
      setBackupData(backup_data);
      //Open warning and recomendation to save current data
      if (existPreviousSessionData) {
        setFileWarning({
          warning: true,
          title: "Existen datos de sesión previa y se sobreescribiran.",
          message:
            "Al cargar estos datos se sobreescribiran los datos de sesión previa que existen en la aplicación, si los necesita guardelos antes de continuar. ¿Desea cargar los datos ahora?",
          withOptions: true,
        });
      } else {
        loadBackupData(backup_data);
      }
    }
  };

  const ignoreLoadingWarning = () => {
    loadBackupData(backupData);
    setFileWarning((prevstate) => ({
      ...prevstate,
      warning: false,
    }));
  };

  const handleSave = () => {
    if (getPreviousSessionToSaveCondition(currentUserId)) {
      console.log("GUARDADO DE DATOS");
      saveBackup({ currentUserId });
    } else {
      setOpenInfo(true);
    }
  };

  const handleLogout = () => {
    if (getPreviousSessionToSaveCondition(currentUserId)) {
      setOpenWarning(true);
    } else {
      manualClosing();
    }
  };

  const handleLogoutWithoutSaving = () => {
    manualClosing();
    setOpenWarning(false);
  };

  const handleSaveOnLogout = () => {
    console.log("GUARDADO DE DATOS");
    saveBackup({ currentUserId });
    manualClosing();
    setOpenWarning(false);
  };

  return {
    handleClick,
    handleSave,
    handleLogout,
    handleSaveOnLogout,
    handleLogoutWithoutSaving,
    handleLoad,
    ignoreLoadingWarning,
    setOpenInfo,
    setOpenWarning,
    openMenu,
    openInfo,
    openWarning,
    fileWarning,
    setFileWarning,
  };
};

export default useSessionOptions;
