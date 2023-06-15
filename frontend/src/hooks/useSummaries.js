import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { removeItemFrom } from "helpers/dataManagement";

const DEFAULT_unsavedFormDataConditions = {
  initialData: false,
  involveds: false,
  vehicles: false,
};

const useSummaries = ({
  sessionSummaries,
  session_previousSummaries,
  updatePreviousSessionSummaries,
  updateSessionSummaries,
}) => {
  const [session_summaries, setSession_summaries] = useState(sessionSummaries);
  const [session_previous_summaries, setSession_previous_summaries] = useState(
    session_previousSummaries
  );
  const [isSession, setIsSession] = useState(1);
  const [summarySelected, setSummarySelected] = useState(null);
  const [table_row_id_deletion, setTable_row_id_deletion] = useState(null);
  const [table_row_id_selection, setTable_row_id_selection] = useState(null);
  const [deleteWarningData, setDeleteWarningData] = useState({
    warning: false,
    message: "",
    title: "",
  });
  const [unsavedWarningData_sessionType, setUnsavedWarningData_sessionType] =
    useState({
      warning: false,
      message: "",
      title: "",
    });
  const [
    unsavedWarningData_selectSummary,
    setUnsavedWarningData_selectSummary,
  ] = useState({
    warning: false,
    message: "",
    title: "",
  });
  const [edition_warningData, setEdition_warningData] = useState({
    warning: false,
    message: "",
    title: "",
  });
  const [infoData, setInfoData] = useState({
    info: false,
    message: "",
    title: "",
  });
  const [unsavedFormDataConditions, setUnsavedFormDataConditions] = useState(
    DEFAULT_unsavedFormDataConditions
  );

  //Show warning in case there is unsaved data or execute callback for session_type change or summary selection change
  const manageUnsavedDataError = useCallback(
    (callback, setStateWarning) => {
      if (
        unsavedFormDataConditions.initialData ||
        unsavedFormDataConditions.involveds ||
        unsavedFormDataConditions.vehicles
      ) {
        setStateWarning({
          warning: true,
          title: "Hay datos de formulario sin guardar. ¿Desea continuar?.",
          message: "Si continúa ahora perderá todo dato sin guardar.",
        });
      } else {
        callback();
      }
    },
    [
      unsavedFormDataConditions.initialData,
      unsavedFormDataConditions.involveds,
      unsavedFormDataConditions.vehicles,
    ]
  );

  const changeSessionType = (newValue) => {
    setIsSession(newValue);
    setSummarySelected(null);
    setUnsavedWarningData_sessionType((prevState) => ({
      ...prevState,
      warning: false,
    }));
  };

  const selectSessionType = (event, newValue) => {
    manageUnsavedDataError(
      () => changeSessionType(newValue),
      setUnsavedWarningData_sessionType
    );
  };

  const ignoreSessionType_warning = () => {
    changeSessionType(isSession === 1 ? 0 : 1);
    setUnsavedFormDataConditions(DEFAULT_unsavedFormDataConditions);
  };

  const changeSelectedSummary = useCallback(
    (id) => {
      let current_summary;
      if (isSession) {
        //Work with session summaries
        current_summary = session_summaries.list.find(
          (summary) => summary.id === id
        );
        setSummarySelected(current_summary);
      } else {
        //Work with session_previous summaries
        current_summary = session_previous_summaries.list.find(
          (summary) => summary.id === id
        );
        setSummarySelected(current_summary);
      }
      setUnsavedWarningData_selectSummary((prevState) => ({
        ...prevState,
        warning: false,
      }));
    },
    [isSession, session_previous_summaries, session_summaries]
  );

  const selectSummary = useCallback(
    (id) => {
      setTable_row_id_selection(id);
      manageUnsavedDataError(
        () => changeSelectedSummary(id),
        setUnsavedWarningData_selectSummary
      );
    },
    [changeSelectedSummary, manageUnsavedDataError]
  );

  const ignoreSelectSummary_warning = () => {
    changeSelectedSummary(table_row_id_selection);
    setUnsavedFormDataConditions(DEFAULT_unsavedFormDataConditions);
  };

  const openDeleteWarning = useCallback(
    (id) => {
      const current_summary_by = isSession
        ? session_summaries.list.find((summary) => summary.id === id).summary_by
        : session_previous_summaries.list.find((summary) => summary.id === id)
            .summary_by;

      setTable_row_id_deletion(id);
      setDeleteWarningData({
        warning: true,
        title: `Esta por eliminar: "${current_summary_by}". ¿Desea continuar?`,
        message: "Los datos serán eliminados definitivamente.",
      });
    },
    [session_previous_summaries, session_summaries, isSession]
  );

  const deleteSummary = useCallback(() => {
    let updated_list;
    const newId = uuidv4();
    //Delete summary only in current session
    if (isSession) {
      //Work with session summaries

      updated_list = removeItemFrom(
        session_summaries.list,
        table_row_id_deletion
      );

      updateSessionSummaries(() => ({
        list: updated_list,
        id: newId,
      }));
    } /*else {
      //Work with session_previous summaries
      updated_list = removeItemFrom(
        session_previous_summaries.list,
        table_row_id_deletion
      );

      updatePreviousSessionSummaries(() => ({
        list: updated_list,
        id: newId,
      }));
    }*/
    //In case selected summary is deleted
    if (summarySelected && table_row_id_deletion === summarySelected.id) {
      setSummarySelected(null);
    }
    setDeleteWarningData((prevState) => ({
      ...prevState,
      warning: false,
    }));
  }, [
    //  session_previous_summaries,
    session_summaries,
    summarySelected,
    table_row_id_deletion,
    isSession,
    updateSessionSummaries,
    // updatePreviousSessionSummaries,
  ]);

  //InitialDataForm, InvolvedDataForm, VehiclesDataForm callback for submission
  //In case of InvolvesDataForm or VehiclesDataForm, validData is an object with the property involveds or vehicles taken from selectedSummary
  //isEdition must be always true for involveds and vehicles
  const manageSummarySubmission = useCallback(
    (isEdition, validData) => {
      const newId = uuidv4();
      const newVersionId = uuidv4();

      const get_updated_list = (list) => {
        const listWithoutSelectedSummary = removeItemFrom(
          list,
          summarySelected.id
        );

        return [
          ...listWithoutSelectedSummary,
          { ...summarySelected, ...validData, version_id: newVersionId },
        ];
      };

      if (isEdition) {
        setSummarySelected((prevState) => ({
          ...prevState,
          ...validData,
          version_id: newVersionId,
        }));
        if (isSession) {
          updateSessionSummaries((prevSummaries) => ({
            id: newId,
            list: get_updated_list(prevSummaries.list),
          }));
        } else {
          updatePreviousSessionSummaries((prevSummaries) => ({
            id: newId,
            list: get_updated_list(prevSummaries.list),
          }));
        }
      } else {
        //Add new summary only if isSession === true, it's not possible to add new summary to previous session
        setSummarySelected((prevState) => ({
          ...prevState,
          ...validData,
          id: newId,
          version_id: newVersionId,
        }));
        if (isSession) {
          updateSessionSummaries((prevSummaries) => ({
            id: newId,
            list: [
              ...prevSummaries.list,
              {
                ...summarySelected,
                ...validData,
                id: newId,
                version_id: newVersionId,
              },
            ],
          }));
        }
      }
    },
    [
      isSession,
      summarySelected,
      updatePreviousSessionSummaries,
      updateSessionSummaries,
    ]
  );

  //In case of unsaved data error solved, clean warningData
  useEffect(() => {
    const unsavedData =
      unsavedFormDataConditions.initialData ||
      unsavedFormDataConditions.involveds ||
      unsavedFormDataConditions.vehicles;

    if (!unsavedData) {
      setUnsavedWarningData_sessionType({
        warning: false,
        message: "",
        title: "",
      });
      setUnsavedWarningData_selectSummary({
        warning: false,
        message: "",
        title: "",
      });
    }
  }, [unsavedFormDataConditions]);

  //Update local states on parent state changes
  useEffect(() => {
    //In case the selected summary was deleted from another tab
    const clean_summarySelected = () => {
      if (
        isSession
          ? summarySelected &&
            !sessionSummaries.list.find(
              (summary) => summary.id === summarySelected.id
            )
          : summarySelected &&
            !session_previousSummaries.list.find(
              (summary) => summary.id === summarySelected.id
            )
      ) {
        setSummarySelected(null);
        setInfoData({
          info: true,
          title: "Se han eliminado los datos seleccionados.",
          message: isSession
            ? "Ha eliminado el sumario actual desde otra pestaña. No debe trabajar con datos de un mismo sumario en más de una pestaña."
            : "Este mensaje aparece cuando elimina los datos seleccionados desde otra pestaña o cuando estos se sobre-escriben ya que cargo datos mediante archivo.",
        });
      }
    };

    const manageSelectedSummary_editionWarning = (sessionType_obj) => {
      if (summarySelected) {
        const matchedSummary = sessionType_obj.list.find(
          (summary) => summary.id === summarySelected.id
        );

        if (matchedSummary) {
          const warningCondition =
            summarySelected.version_id !== matchedSummary.version_id;

          if (warningCondition) {
            setSummarySelected(null);
            setUnsavedFormDataConditions(DEFAULT_unsavedFormDataConditions);
            setEdition_warningData({
              warning: true,
              title:
                "Ha modificado los datos seleccionados desde otra pestaña.",
              message:
                "No debe trabajar con datos de un mismo sumario en más de una pestaña.",
            });
          }
        }
      }
    };

    if (sessionSummaries) {
      if (session_summaries) {
        //The id difference happens in case of add new summary, delete one or modified one
        if (sessionSummaries.id !== session_summaries.id) {
          setSession_summaries(sessionSummaries);
          clean_summarySelected();
          //In case LS is updated from another tab but are the initial data, involveds or vehicles forms that fired the update, same summaries id but different version_id for
          //the selectedSummary updated
          manageSelectedSummary_editionWarning(sessionSummaries);
        }
      } else setSession_summaries(sessionSummaries);
    }
    if (session_previousSummaries) {
      if (session_previous_summaries) {
        //The id difference happens in case of add new summary, delete one or modified one
        if (session_previousSummaries.id !== session_previous_summaries.id) {
          setSession_previous_summaries(session_previousSummaries);
          clean_summarySelected();
          //In case LS is updated from another tab but are the initial data, involveds or vehicles forms that fired the update, same summaries id but different version_id for
          //the selectedSummary updated
          manageSelectedSummary_editionWarning(session_previousSummaries);
        }
      } else setSession_previous_summaries(session_previousSummaries);
    }
  }, [
    sessionSummaries,
    session_previousSummaries,
    session_summaries,
    session_previous_summaries,
    summarySelected,
    isSession,
  ]);

  return {
    session_summaries,
    session_previous_summaries,
    summarySelected,
    isSession,
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
  };
};

export default useSummaries;
