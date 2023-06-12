import { useMemo } from "react";
import { Typography } from "@mui/material";
import InvolvedsSelector from "pages/summaries/involveds/InvolvedsSelector";
import InvolvedForm from "pages/summaries/involveds/InvolvedForm";

const Involveds = ({
  involveds,
  setUnsavedFormDataConditions,
  unsavedInvolvedData,
  manageSummarySubmission,
  // setSummarySelected,
}) => {
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

  //TODO: Manejar eliminación de involved seleccionado, y blanqueo de formData, previo warningpopup
  //TODO: Manejar selección de involved, y carga de formData, y manejar warningpopup si
  //se intenta seleccionar otro y hay formData sin guardar

  //PRUEBAS MANUALES
  //Slección de involucrado y su carga en formData
  //Si unsavedInvolvedData === true, y se intenta seleccionar otro, mostrar WarningPopUp
  //Si se clickea eliminar involucrado, mostrar WarningPopUp
  //Si se elimina involucrado actual blanquear formData, puede funcionar al setear involvedSelected a null
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Datos de involucrados
      </Typography>
      <InvolvedsSelector
        involveds={involvedsTransformed}
        /* selectedItemId=''
      /*selectItem={selectItem}
      deleteItem={deleteItem}*/
      />
      <Typography variant="h2" gutterBottom>
        Circunstancias personales
      </Typography>
      <InvolvedForm
        involveds={involveds}
        setUnsavedFormDataConditions={setUnsavedFormDataConditions}
        unsavedInvolvedData={unsavedInvolvedData}
        manageSummarySubmission={manageSummarySubmission}
      />
    </>
  );
};

export default Involveds;
