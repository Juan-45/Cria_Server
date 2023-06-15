import useSummaries from "hooks/useSummaries";
import useGet_ps_data from "hooks/useGet_ps_data";
import { Typography, Alert } from "@mui/material";
import { GenericContainer, Divider } from "components/CommonStyles";
import TableBasic from "components/Table";
import SessionSelectorTab from "components/SessionSelectorTab";
import WarningPopUp from "components/WarningPopUp";
import InfoPopUp from "components/InfoPopUp";
import ErrorPopUp from "components/ErrorPopUp";
import InitialDataForm from "pages/summaries/InitialDataForm";
import RenderIf from "components/RenderIf";
import Loading from "components/Loading";
import Involveds from "pages/summaries/Involveds";
import Vehicles from "pages/summaries/Vehicles";
import TemplateManager from "pages/summaries/TemplateManager";

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
  updatePreviousSessionSummaries,
  updateSessionSummaries,
  getSummaryFiles,
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
    updatePreviousSessionSummaries,
    updateSessionSummaries,
  });
  const { errorData: request_ps_data_error, ps_data } = useGet_ps_data();

  const isSummarySelected = summarySelected !== null;

  /*console.log("ESTADOS Summaries:", {
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
  });*/

  //TODO: AGREGAR CAMPO TYPE DATE "FECHA DE ACTUACIONES" A INITIALDATAFORM
  //TODO: AL CAPTURAR DATOS PARA ARMADO DE ARCHIVO, USAR DAY, MONTH, YEAR, DE LA SECCIÓN INITIAL DATA, PARA ARMAR LA FECHA
  //PARA: ARCHIVOS DE BASE Y LEGAJOS

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
        selectedSummaryId={summarySelected ? summarySelected.id : null}
        selectSummary={selectSummary}
        openDeleteWarning={openDeleteWarning}
        noDeleteSummary={!isSession}
      />
      <Typography variant='h2' gutterBottom>
        Datos iniciales
      </Typography>
      <RenderIf condition={!ps_data.ps_data_ready}>
        <Loading />
      </RenderIf>
      <RenderIf
        condition={
          isSession
            ? ps_data.ps_data_ready
            : ps_data.ps_data_ready && summarySelected
        }
      >
        <InitialDataForm
          ps_data={ps_data}
          setUnsavedFormDataConditions={setUnsavedFormDataConditions}
          summarySelected={summarySelected}
          unsavedInitialData={unsavedFormDataConditions.initialData}
          setSummarySelected={setSummarySelected}
          manageSummarySubmission={manageSummarySubmission}
          isSession={isSession}
        />
      </RenderIf>
      <RenderIf condition={!summarySelected && !isSession}>
        <Alert severity='info'>
          Al trabajar con datos de una sesión anterior, solo es posible
          modificar esos datos, no podra agregar datos para una nueva actuación,
          ni eliminar atuaciones existentes. Para continuar, seleccione una
          actuación de la lista.
        </Alert>
      </RenderIf>
      <RenderIf condition={isSummarySelected}>
        <Divider />
        <Involveds
          involveds={summarySelected ? summarySelected.involveds : null}
          setUnsavedFormDataConditions={setUnsavedFormDataConditions}
          unsavedInvolvedData={unsavedFormDataConditions.involveds}
          manageSummarySubmission={manageSummarySubmission}
          setSummarySelected={setSummarySelected}
        />
        <Divider />
        <Vehicles
          involveds={summarySelected ? summarySelected.involveds : null}
          vehicles={summarySelected ? summarySelected.vehicles : null}
          setUnsavedFormDataConditions={setUnsavedFormDataConditions}
          unsavedVehicleData={unsavedFormDataConditions.vehicles}
          manageSummarySubmission={manageSummarySubmission}
          setSummarySelected={setSummarySelected}
        />
        <Divider />
        <Typography variant='h1' gutterBottom>
          Obtención de plantillas
        </Typography>
        <TemplateManager
          summarySelected={summarySelected}
          currentUser={currentUser}
          getSummaryFiles={getSummaryFiles}
        />
      </RenderIf>
    </GenericContainer>
  );
};

export default Summaries;
