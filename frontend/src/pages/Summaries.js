import useSummaries from "hooks/useSummaries";
import useGet_ps_data from "hooks/useGet_ps_data";
import { Typography } from "@mui/material";
import { GenericContainer, Divider } from "components/CommonStyles";
import TableBasic from "components/Table";
import SessionSelectorTab from "components/SessionSelectorTab";
import WarningPopUp from "components/WarningPopUp";
import InfoPopUp from "components/InfoPopUp";
import ErrorPopUp from "components/ErrorPopUp";
import InitialDataForm from "pages/summaries/InitialDataForm";
import RenderIf from "components/RenderIf";
import Loading from "components/Loading";
import Involveds from "./summaries/Involveds";
/*import {
  saveItem,
  removeItem,
  // getCurrentSessionTimestamp_key,
  getCurrentSession_key,
  // getCurrentUserSessionID_key,
  //getPreviousSession_Key,
  getLocalStorageSize,
  // load_globalData,
} from "helpers/localStorage";*/

const HEAD = [
  { label: "Actuaciones por:", key: "summary_by" },
  { label: "Ipp", key: "ipp" },
  { label: "Víctima/s", key: "victims" },
  { label: "Denunciante/s", key: "complainants" },
  { label: "Causante/s", key: "causants" },
  { label: "Imputado/s", key: "accuseds" },
];

const Summaries = ({
  currentUser,
  sessionSummaries,
  session_previousSummaries,
  setGlobalData,
  filesPicker,
  manage_service_filesSubFolder,
  manage_backup_subFolder,
  updatePreviousSessionSummaries,
  updateSessionSummaries,
}) => {
  const {
    session_summaries,
    session_previous_summaries,
    isSession,
    summarySelected,
    deleteWarningData,
    unsavedWarningData_sessionType,
    unsavedWarningData_selectSummary,
    edition_warningData,
    infoData,
    unsavedFormDataConditions,
    setDeleteWarningData,
    setUnsavedWarningData_sessionType,
    setUnsavedWarningData_selectSummary,
    setEdition_warningData,
    setInfoData,
    setSession_summaries,
    setSession_previous_summaries,
    setUnsavedFormDataConditions,
    setSummarySelected,
    selectSummary,
    deleteSummary,
    openDeleteWarning,
    selectSessionType,
    ignoreSessionType_warning,
    ignoreSelectSummary_warning,
    manageSummarySubmission,
  } = useSummaries({
    sessionSummaries,
    session_previousSummaries,
    setGlobalData,
    updatePreviousSessionSummaries,
    updateSessionSummaries,
  });
  const { errorData: request_ps_data_error, ps_data } = useGet_ps_data();

  const isSummarySelected = summarySelected !== null;

  console.log("ESTADOS Summaries:", {
    session_summaries,
    session_previous_summaries,
    isSession,
    summarySelected,
    deleteWarningData,
    unsavedWarningData_sessionType,
    unsavedWarningData_selectSummary,
    infoData,
    unsavedFormDataConditions,
    ps_data,
    request_ps_data_error,
    edition_warningData,
  });

  /*const [warningData, setWarningData] = useState({
    warning: false,
    message: "",
  });

  const selectServiceFolder = async () => {
    const files_subFolderHandle = await manage_service_filesSubFolder({
      filesSubFolder_name: "Hecho de prueba 2",
    });
    return files_subFolderHandle;
  };

  const selectBackupFolder = async () => {
    const backupHandle = await manage_backup_subFolder();
    return backupHandle;
  };*/

  return (
    <GenericContainer
      className='column max1200 sidePaddingOnLg'
      sx={{ paddingBottom: "300px" }}
    >
      <ErrorPopUp
        errorCondition={request_ps_data_error.error}
        errorData={request_ps_data_error}
        isRequestType={true}
        shouldResetSite={request_ps_data_error.shouldResetSite}
      />
      <WarningPopUp
        open={deleteWarningData.warning}
        setOpen={(val) =>
          setDeleteWarningData((prevState) => ({ ...prevState, warning: val }))
        }
        onAccept={deleteSummary}
        onCancel={() =>
          setDeleteWarningData((prevState) => ({
            ...prevState,
            warning: false,
          }))
        }
        title={deleteWarningData.title}
        message={deleteWarningData.message}
      />
      <WarningPopUp
        open={unsavedWarningData_sessionType.warning}
        setOpen={(val) =>
          setUnsavedWarningData_sessionType((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        onAccept={ignoreSessionType_warning}
        onCancel={() =>
          setUnsavedWarningData_sessionType((prevState) => ({
            ...prevState,
            warning: false,
          }))
        }
        title={unsavedWarningData_sessionType.title}
        message={unsavedWarningData_sessionType.message}
      />
      <WarningPopUp
        open={unsavedWarningData_selectSummary.warning}
        setOpen={(val) =>
          setUnsavedWarningData_selectSummary((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        onAccept={ignoreSelectSummary_warning}
        onCancel={() =>
          setUnsavedWarningData_selectSummary((prevState) => ({
            ...prevState,
            warning: false,
          }))
        }
        title={unsavedWarningData_selectSummary.title}
        message={unsavedWarningData_selectSummary.message}
      />
      <WarningPopUp
        withOptions={false}
        open={edition_warningData.warning}
        setOpen={(val) =>
          setEdition_warningData((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        title={edition_warningData.title}
        message={edition_warningData.message}
      />
      <InfoPopUp
        open={infoData.info}
        setOpen={(val) =>
          setInfoData((prevState) => ({ ...prevState, info: val }))
        }
        title={infoData.title}
        message={infoData.message}
      />
      <RenderIf condition={session_previous_summaries}>
        <SessionSelectorTab
          isSession={isSession}
          selectSessionType={selectSessionType}
        />
      </RenderIf>
      <Typography variant='h1' gutterBottom>
        Listado de actuaciones
      </Typography>
      <TableBasic
        head={HEAD}
        data={
          isSession
            ? session_summaries
              ? session_summaries.list
              : []
            : session_previous_summaries
            ? session_previous_summaries.list
            : []
        }
        selectSummary={selectSummary}
        openDeleteWarning={openDeleteWarning}
      />
      <Divider />
      <Typography variant='h2' gutterBottom>
        Datos iniciales
      </Typography>
      <RenderIf condition={!ps_data.ps_data_ready}>
        <Loading />
      </RenderIf>
      <RenderIf condition={ps_data.ps_data_ready}>
        <InitialDataForm
          ps_data={ps_data}
          setUnsavedFormDataConditions={setUnsavedFormDataConditions}
          summarySelected={summarySelected}
          unsavedInitialData={unsavedFormDataConditions.initialData}
          setSummarySelected={setSummarySelected}
          manageSummarySubmission={manageSummarySubmission}
        />
      </RenderIf>
      <Divider />
      <RenderIf condition={/*isSummarySelected*/ true}>
        <Involveds
          //involveds={summarySelected ? summarySelected.involveds : null}
          involveds={[
            {
              id: "1",
              type: "isVictim",
              gender: "masculino",
              fullName: "Juan Perez",
              nationality: "Argentina",
              education: "sí",
              civilStatus: "soltero",
              occupation: "empleado",
              age: "30",
              birthDate: "1992-05-10",
              dni: "12345678",
              phone: "123456789",
              address: "Calle Principal 123",
              city: "Pergamino",
              province: "Buenos Aires",
            },
            {
              id: "2",
              type: "isComplainant",
              gender: "femenino",
              fullName: "Maria Gonzalez",
              nationality: "Argentina",
              education: "no",
              civilStatus: "casada",
              occupation: "ama de casa",
              age: "35",
              birthDate: "1987-09-20",
              dni: "98765432",
              phone: "987654321",
              address: "Avenida Principal 456",
              city: "Pergamino",
              province: "Buenos Aires",
            },
            {
              id: "3",
              type: "isAccused",
              gender: "masculino",
              fullName: "Carlos Sanchez",
              nationality: "Argentina",
              education: "sí",
              civilStatus: "divorciado",
              occupation: "jubilado/pensionado",
              age: "60",
              birthDate: "1963-03-15",
              dni: "54321678",
              phone: "543216789",
              address: "Plaza Principal 789",
              city: "Pergamino",
              province: "Buenos Aires",
            },
          ]}
        />
      </RenderIf>
    </GenericContainer>
  );
};

export default Summaries;
