import { useMemo, useCallback, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import InvolvedsSelector from "pages/summaries/involveds/InvolvedsSelector";
import InvolvedForm from "pages/summaries/involveds/InvolvedForm";
import WarningPopUp from "components/WarningPopUp";
import { removeItemFrom } from "helpers/dataManagement";
import { getInvolvedsNames_by } from "helpers/dataManagement";

const Involveds = ({
  involveds,
  setUnsavedFormDataConditions,
  unsavedInvolvedData,
  manageSummarySubmission,
}) => {
  const [involvedSelected, setInvolvedSelected] = useState(null);
  const [itemId_deletion, setItemId_deletion] = useState(null);
  const [itemId_selection, setItemId_selection] = useState(null);
  const [deleteWarningData, setDeleteWarningData] = useState({
    warning: false,
    message: "",
    title: "",
  });
  const [unsavedWarningData_newSelection, setUnsavedWarningData_newSelection] =
    useState({
      warning: false,
      message: "",
      title: "",
    });

  //console.log("PROPS Involveds:", { involveds });

  /* console.log("ESTADOS Involveds:", {
    involvedSelected,
    itemId_deletion,
    itemId_selection,
    deleteWarningData,
    unsavedWarningData_newSelection,
  });*/

  const involvedsTransformed = useMemo(() => {
    if (involveds) {
      let involvedsTransformed = {
        victims: [],
        complainants: [],
        causants: [],
        accuseds: [],
      };

      involveds.forEach((involved) => {
        if (involved.type === "isVictim") {
          involvedsTransformed.victims.push({
            label: involved.fullName,
            id: involved.id,
          });
        } else if (involved.type === "isComplainant") {
          involvedsTransformed.complainants.push({
            label: involved.fullName,
            id: involved.id,
          });
        } else if (involved.type === "isCausant") {
          involvedsTransformed.causants.push({
            label: involved.fullName,
            id: involved.id,
          });
        } else {
          involvedsTransformed.accuseds.push({
            label: involved.fullName,
            id: involved.id,
          });
        }
      });

      return involvedsTransformed;
    } else
      return {
        victims: null,
        complainants: null,
        causants: null,
        accuseds: null,
      };
  }, [involveds]);

  const manageUnsavedDataError = useCallback(
    (callback, setStateWarning) => {
      if (unsavedInvolvedData) {
        setStateWarning({
          warning: true,
          title: "Hay datos de formulario sin guardar. ¿Desea continuar?.",
          message: "Si continúa ahora perderá todo dato sin guardar.",
        });
      } else {
        callback();
      }
    },
    [unsavedInvolvedData]
  );

  const changeSelectedInvolved = useCallback(
    (id) => {
      const current_involved = involveds.find((involved) => involved.id === id);
      setInvolvedSelected(current_involved);
      setUnsavedWarningData_newSelection((prevState) => ({
        ...prevState,
        warning: false,
      }));
    },
    [involveds]
  );

  const selectInvolved = useCallback(
    (id) => {
      setItemId_selection(id);
      manageUnsavedDataError(
        () => changeSelectedInvolved(id),
        setUnsavedWarningData_newSelection
      );
    },
    [changeSelectedInvolved, manageUnsavedDataError]
  );

  const ignoreSelectInvolved_warning = () => {
    changeSelectedInvolved(itemId_selection);
    setUnsavedFormDataConditions((prevState) => ({
      ...prevState,
      involveds: false,
    }));
  };

  const openDeleteWarning = useCallback(
    (id) => {
      const current_involved_obj = involveds.find(
        (involved) => involved.id === id
      );

      const getInvolvedType_label = (type) => {
        if (type === "isVictim") {
          return "víctima";
        } else if (type === "isComplainant") {
          return "denunciante";
        } else if (type === "isCausant") {
          return "causante";
        } else {
          return "imputado";
        }
      };

      setItemId_deletion(id);
      setDeleteWarningData({
        warning: true,
        title: `Esta por eliminar ${getInvolvedType_label(
          current_involved_obj.type
        )}: "${current_involved_obj.fullName}". ¿Desea continuar?`,
        message: "Los datos serán eliminados definitivamente.",
      });
    },
    [involveds]
  );

  const deleteInvolved = useCallback(() => {
    const list_without_deletedInvolved = removeItemFrom(
      involveds,
      itemId_deletion
    );

    const list_to_update =
      list_without_deletedInvolved.length > 0
        ? list_without_deletedInvolved
        : null;
    //To manage summarySelected, LS and globalData
    manageSummarySubmission(true, {
      involveds: list_to_update,

      victims: getInvolvedsNames_by("isVictim", list_to_update),
      complainants: getInvolvedsNames_by("isComplainant", list_to_update),
      causants: getInvolvedsNames_by("isCausant", list_to_update),
      accuseds: getInvolvedsNames_by("isAccused", list_to_update),
    });

    //In case involved selected is deleted
    if (involvedSelected && itemId_deletion === involvedSelected.id) {
      setInvolvedSelected(null);
    }
    setDeleteWarningData((prevState) => ({
      ...prevState,
      warning: false,
    }));
  }, [involveds, itemId_deletion, involvedSelected, manageSummarySubmission]);

  //To uptade involvedSelected if involveds changes because of another summary being selected
  useEffect(() => {
    if (involveds) {
      if (involvedSelected) {
        involveds.find((involved) => involved.id === involvedSelected.id)
          ? null
          : setInvolvedSelected(null);
      }
    } else {
      setInvolvedSelected(null);
    }
  }, [involveds, involvedSelected]);
  return (
    <>
      <WarningPopUp
        open={unsavedWarningData_newSelection.warning}
        setOpen={(val) =>
          setUnsavedWarningData_newSelection((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        onAccept={ignoreSelectInvolved_warning}
        onCancel={() =>
          setUnsavedWarningData_newSelection((prevState) => ({
            ...prevState,
            warning: false,
          }))
        }
        title={unsavedWarningData_newSelection.title}
        message={unsavedWarningData_newSelection.message}
      />
      <WarningPopUp
        open={deleteWarningData.warning}
        setOpen={(val) =>
          setDeleteWarningData((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        onAccept={deleteInvolved}
        onCancel={() =>
          setDeleteWarningData((prevState) => ({
            ...prevState,
            warning: false,
          }))
        }
        title={deleteWarningData.title}
        message={deleteWarningData.message}
      />
      <Typography variant='h2' gutterBottom>
        Listado de involucrados
      </Typography>
      <InvolvedsSelector
        involveds={involvedsTransformed}
        selectedItemId={involvedSelected ? involvedSelected.id : ""}
        selectItem={selectInvolved}
        deleteItem={openDeleteWarning}
      />
      <Typography variant='h2' gutterBottom>
        Datos personales
      </Typography>
      <InvolvedForm
        involveds={involveds}
        involvedSelected={involvedSelected}
        setUnsavedFormDataConditions={setUnsavedFormDataConditions}
        setInvolvedSelected={setInvolvedSelected}
        unsavedInvolvedData={unsavedInvolvedData}
        manageSummarySubmission={manageSummarySubmission}
      />
    </>
  );
};

export default Involveds;
