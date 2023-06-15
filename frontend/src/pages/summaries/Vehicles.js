import { useMemo, useCallback, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { GenericContainer } from "components/CommonStyles";
import VehiclesSelector from "pages/summaries/vehicles/VehiclesSelector";
import VehicleForm from "pages/summaries/vehicles/VehicleForm";
import WarningPopUp from "components/WarningPopUp";
import { removeItemFrom, getVehicleLabel } from "helpers/dataManagement";

const Vehicles = ({
  involveds,
  vehicles,
  setUnsavedFormDataConditions,
  unsavedVehicleData,
  manageSummarySubmission,
}) => {
  const [vehicleSelected, setVehicleSelected] = useState(null);
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

  /*console.log("PROPS Vehicles:", { vehicles });

  console.log("ESTADOS Vehicles:", {
    vehicleSelected,
    itemId_deletion,
    itemId_selection,
    deleteWarningData,
    unsavedWarningData_newSelection,
  });*/

  const involvedsOptions = useMemo(() => {
    const defaultOption = {
      label: "Desconocido/a",
      val: "unknown",
    };

    if (involveds) {
      return [
        ...involveds.map((involved) => ({
          label: involved.fullName,
          val: involved.id,
        })),
        defaultOption,
      ];
    } else return [defaultOption];
  }, [involveds]);

  const vehiclesTransformed = useMemo(() => {
    if (vehicles) {
      let vehiclesTransformed = {
        //Sustraidos
        stolen: [],
        //Secuestrados
        seized: [],
      };

      vehicles.forEach((vehicle) => {
        if (vehicle.status === "isStolen") {
          vehiclesTransformed.stolen.push({
            label: getVehicleLabel(vehicle),
            id: vehicle.id,
          });
        } else {
          vehiclesTransformed.seized.push({
            label: getVehicleLabel(vehicle),
            id: vehicle.id,
          });
        }
      });

      return vehiclesTransformed;
    } else
      return {
        stolen: null,
        seized: null,
      };
  }, [vehicles]);

  const manageUnsavedDataError = useCallback(
    (callback, setStateWarning) => {
      if (unsavedVehicleData) {
        setStateWarning({
          warning: true,
          title: "Hay datos de formulario sin guardar. ¿Desea continuar?.",
          message: "Si continúa ahora perderá todo dato sin guardar.",
        });
      } else {
        callback();
      }
    },
    [unsavedVehicleData]
  );

  const changeSelectedVehicle = useCallback(
    (id) => {
      const current_involved = vehicles.find((vehicle) => vehicle.id === id);
      setVehicleSelected(current_involved);
      setUnsavedWarningData_newSelection((prevState) => ({
        ...prevState,
        warning: false,
      }));
    },
    [vehicles]
  );

  const selectVehicle = useCallback(
    (id) => {
      setItemId_selection(id);
      manageUnsavedDataError(
        () => changeSelectedVehicle(id),
        setUnsavedWarningData_newSelection
      );
    },
    [changeSelectedVehicle, manageUnsavedDataError]
  );

  const ignoreSelectVehicle_warning = () => {
    changeSelectedVehicle(itemId_selection);
    setUnsavedFormDataConditions((prevState) => ({
      ...prevState,
      involveds: false,
    }));
  };

  const openDeleteWarning = useCallback(
    (id) => {
      const current_vehicle_obj = vehicles.find((vehicle) => vehicle.id === id);

      setItemId_deletion(id);
      setDeleteWarningData({
        warning: true,
        title: `Esta por eliminar ${getVehicleLabel(
          current_vehicle_obj
        )}". ¿Desea continuar?`,
        message: "Los datos serán eliminados definitivamente.",
      });
    },
    [vehicles]
  );

  const deleteIVehicle = useCallback(() => {
    const list_without_deletedVehicle = removeItemFrom(
      vehicles,
      itemId_deletion
    );

    const list_to_update =
      list_without_deletedVehicle.length > 0
        ? list_without_deletedVehicle
        : null;
    //To manage summarySelected, LS and globalData
    manageSummarySubmission(true, { vehicles: list_to_update });

    //In case vehicle selected is deleted
    if (vehicleSelected && itemId_deletion === vehicleSelected.id) {
      setVehicleSelected(null);
    }
    setDeleteWarningData((prevState) => ({
      ...prevState,
      warning: false,
    }));
  }, [vehicles, itemId_deletion, vehicleSelected, manageSummarySubmission]);

  //To uptade vehicleSelected if vehicles changes because of another summary being selected
  useEffect(() => {
    if (vehicles) {
      if (vehicleSelected) {
        vehicles.find((vehicle) => vehicle.id === vehicleSelected.id)
          ? null
          : setVehicleSelected(null);
      }
    } else {
      setVehicleSelected(null);
    }
  }, [vehicles, vehicleSelected]);
  return (
    <GenericContainer className='max900 column'>
      <WarningPopUp
        open={unsavedWarningData_newSelection.warning}
        setOpen={(val) =>
          setUnsavedWarningData_newSelection((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        onAccept={ignoreSelectVehicle_warning}
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
        onAccept={deleteIVehicle}
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
        Listado de vehículos
      </Typography>
      <VehiclesSelector
        vehicles={vehiclesTransformed}
        selectedItemId={vehicleSelected ? vehicleSelected.id : ""}
        selectItem={selectVehicle}
        deleteItem={openDeleteWarning}
      />
      <Typography variant='h2' gutterBottom>
        Datos de vehículo
      </Typography>
      <VehicleForm
        involvedsOptions={involvedsOptions}
        vehicles={vehicles}
        vehicleSelected={vehicleSelected}
        setUnsavedFormDataConditions={setUnsavedFormDataConditions}
        setVehicleSelected={setVehicleSelected}
        unsavedVehicleData={unsavedVehicleData}
        manageSummarySubmission={manageSummarySubmission}
      />
    </GenericContainer>
  );
};

export default Vehicles;
