import { useState, useEffect, useCallback, useMemo, memo } from "react";
import useUnsavedFormData from "hooks/useUnsavedFormData";
import { v4 as uuidv4 } from "uuid";
import { removeItemFrom, getPropertiesFrom } from "helpers/dataManagement";
import {
  getInputErrorException,
  getValueIsNotDefinedCondition,
} from "helpers/error";
import {
  FieldsContainer,
  FormContainer,
  FormMessage,
  FormSettings,
} from "components/FormStyles";
import { ResponsiveItem, ResponsiveContainer } from "components/CommonStyles";
import Select from "components/Select";
import Input from "components/Input";
import RenderIf from "components/RenderIf";

const DEFAULT_FORM_DATA = {
  id: "",
  type: "",
  status: "",
  associatedTo: "",
  brand: "",
  model: "",
  engineNro: "",
  vehicleFrameNro: "",
  color: "",
  plate: "",
};

const DEFAULT_FORM_MESSAGE = {
  open: false,
  severity: "warning",
  message: "",
};

const DEFAULT_REQUIRED_ERROR = {
  error: false,
  helperText: "",
};

const VEHICLES_TYPES = [
  {
    label: "Vehículo automotor",
    val: "vehículo automotor",
  },
  {
    label: "Motovehículo",
    val: "motovehículo",
  },
  {
    label: "Bicicleta",
    val: "bicicleta",
  },
];

const VEHICLE_STATUS = [
  {
    label: "Secuestrado",
    val: "isSeized",
  },
  {
    label: "Sustraido",
    val: "isStolen",
  },
];

const VehicleForm = ({
  setUnsavedFormDataConditions,
  setVehicleSelected,
  involvedsOptions,
  vehicles,
  vehicleSelected,
  unsavedVehicleData,
  manageSummarySubmission,
}) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formMessage, setFormMessage] = useState(DEFAULT_FORM_MESSAGE);
  const [requiredError, setRequiredError] = useState(DEFAULT_REQUIRED_ERROR);

  const isEdition = formData.id !== "";
  const isNotBicycle = formData.type !== "bicicleta";
  const isBicycle = formData.type === "bicicleta";
  const isMotorcycle = formData.type === "motovehículo";

  //console.log("PROPS VehicleForm:", { involvedsOptions });

  /*console.log("VARIABLES SINC VehicleForm:", {
    isEdition,
    isNotBicycle,
    isBicycle,
    isMotorcycle,
  });*/

  /*console.log("ESTADOS VehicleForm:", {
    formData,
    formMessage,
    requiredError,
  });*/

  const getValidFormData = (isNotBicycle, formData) => {
    const manageRequiredError = () => {
      setFormMessage({
        open: true,
        severity: "error",
        message: "Hay campos requeridos sin completar.",
      });
      setRequiredError({
        error: true,
        helperText: "Campo requerido",
      });
      return null;
    };

    const excludedProperties = ["id", "plate", "engineNro"];

    const isNotBicycle_required_keys = getPropertiesFrom(DEFAULT_FORM_DATA, [
      "id",
    ]);

    const isBicycle_required_keys = getPropertiesFrom(
      DEFAULT_FORM_DATA,
      excludedProperties
    );

    if (isNotBicycle) {
      const { id, ...isNotBicycleData } = formData;

      let requiredError;

      isNotBicycle_required_keys.forEach((required_key) => {
        const requiredValue = isNotBicycleData[required_key];
        if (requiredValue === "") {
          requiredError = true;
        }
      });

      if (requiredError) {
        manageRequiredError();
      } else return isNotBicycleData;
    } else {
      const { id, plate, engineNro, ...isBicycleData } = formData;

      let requiredError;

      isBicycle_required_keys.forEach((required_key) => {
        const requiredValue = isBicycleData[required_key];
        if (requiredValue === "") {
          requiredError = true;
        }
      });

      if (requiredError) {
        manageRequiredError();
      } else return isBicycleData;
    }
  };

  const closeFormMessage = () => {
    setFormMessage((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const setUnsavedDataHandler = useCallback(
    (condition) => {
      if (condition) {
        setUnsavedFormDataConditions((prevState) => ({
          ...prevState,
          vehicles: true,
        }));
        setFormMessage({
          open: true,
          severity: "warning",
          message: "En este formulario hay datos sin guardar.",
        });
      } else {
        setUnsavedFormDataConditions((prevState) => ({
          ...prevState,
          vehicles: false,
        }));
        setFormMessage((prevState) => {
          if (prevState.severity === "warning") {
            return {
              ...prevState,
              open: false,
            };
          } else return prevState;
        });
      }
    },
    [setUnsavedFormDataConditions]
  );

  //On successful submission
  const unsetUnsavedDataHandler = useCallback(
    () =>
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        vehicles: false,
      })),
    [setUnsavedFormDataConditions]
  );

  //Submit function only accesible for the user when unsavedInvolvedData is true thanks to FormSettings
  const submitForm = () => {
    //In case of requiredError returns null
    const validFormData = getValidFormData(isNotBicycle, formData);

    if (validFormData) {
      let validData;

      if (isEdition) {
        const involvedsWithoutCurrent = removeItemFrom(vehicles, formData.id);
        validData = [
          ...involvedsWithoutCurrent,
          { ...validFormData, id: formData.id },
        ];
        setVehicleSelected({ ...validFormData, id: formData.id });
      } else {
        const newId = uuidv4();
        if (vehicles) {
          validData = [...vehicles, { ...validFormData, id: newId }];
        } else {
          validData = [{ ...validFormData, id: newId }];
        }
        setVehicleSelected({ ...validFormData, id: newId });
      }

      manageSummarySubmission(true, {
        vehicles: validData,
      });

      setFormMessage({
        open: true,
        severity: "success",
        message: isEdition
          ? "Datos modificados exitosamente."
          : "Datos agregados exitosamente.",
      });
      setRequiredError(DEFAULT_REQUIRED_ERROR);
      unsetUnsavedDataHandler();
    }
  };

  const renewVehicleSelected = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setFormMessage(DEFAULT_FORM_MESSAGE);
    setVehicleSelected(null);
    unsetUnsavedDataHandler();
  }, [unsetUnsavedDataHandler, setVehicleSelected]);

  //To manage unsaved field data
  const getSpredKeys = useCallback((obj, isBicycle) => {
    if (isBicycle) {
      const { id, plate, engineNro, ...isBicycleData } = obj;
      return isBicycleData;
    } else {
      const { id, ...isNotBicycleData } = obj;

      return isNotBicycleData;
    }
  }, []);

  const fieldsData = useMemo(
    () => getSpredKeys(formData, isBicycle),
    [formData, isBicycle, getSpredKeys]
  );

  const handleType = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleStatus = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const handleAssociatedTo = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      associatedTo: event.target.value,
    }));
  };

  const handleBrand = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      brand: value,
    }));
  };

  const handleModel = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      model: value,
    }));
  };

  const handleEngineNro = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      engineNro: value,
    }));
  };

  const handleVehicleFrameNro = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      vehicleFrameNro: value,
    }));
  };

  const handleColor = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      color: value,
    }));
  };

  const handlePlate = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      plate: value,
    }));
  };

  useUnsavedFormData({
    setUnsavedDataHandler,
    fieldsData,
    comparisonData: isEdition ? vehicleSelected : DEFAULT_FORM_DATA,
  });
  useEffect(() => {
    const getFormDataValuesFrom = (vehicleSelected) => {
      const { plate, engineNro, ...isBicycleData } = vehicleSelected;

      if (vehicleSelected.type === "bicicleta") {
        return isBicycleData;
      } else {
        return vehicleSelected;
      }
    };

    if (vehicleSelected) {
      //In case of vehicleSelected changes from parent component, update local state if id is different
      if (vehicleSelected.id !== formData.id) {
        setFormData(getFormDataValuesFrom(vehicleSelected));
        if (isEdition) {
          setFormMessage(DEFAULT_FORM_MESSAGE);
          setRequiredError(DEFAULT_REQUIRED_ERROR);
        }
      }
    } else {
      //In case of vehicleSelected is null, reset formData to default values
      if (isEdition) {
        renewVehicleSelected();
      }
    }
  }, [vehicleSelected, formData.id, isEdition, renewVehicleSelected]);

  return (
    <FormContainer className='column max900'>
      <FieldsContainer>
        <ResponsiveItem>
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Select
                label='Tipo'
                value={formData.type}
                required
                error={getInputErrorException(
                  requiredError.error,
                  getValueIsNotDefinedCondition(formData.type)
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.type)
                )}
                onChange={handleType}
                options={VEHICLES_TYPES}
                inputProps={{ disabled: isEdition }}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label='Estado'
                value={formData.status}
                required
                error={getInputErrorException(
                  requiredError.error,
                  getValueIsNotDefinedCondition(formData.status)
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.status)
                )}
                onChange={handleStatus}
                options={VEHICLE_STATUS}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
          <Select
            label='Asociado a'
            value={formData.associatedTo}
            required
            error={getInputErrorException(
              requiredError.error,
              getValueIsNotDefinedCondition(formData.associatedTo)
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              getValueIsNotDefinedCondition(formData.associatedTo)
            )}
            onChange={handleAssociatedTo}
            options={involvedsOptions}
          />
          <Input
            label='Marca'
            value={formData.brand}
            onChange={handleBrand}
            required
            error={getInputErrorException(
              requiredError.error,
              getValueIsNotDefinedCondition(formData.brand)
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              getValueIsNotDefinedCondition(formData.cover)
            )}
          />
          <Input
            label='Modelo'
            value={formData.model}
            onChange={handleModel}
            required
            error={getInputErrorException(
              requiredError.error,
              getValueIsNotDefinedCondition(formData.model)
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              getValueIsNotDefinedCondition(formData.model)
            )}
          />
        </ResponsiveItem>
        <ResponsiveItem>
          <Input
            label={isBicycle || isMotorcycle ? "Cuadro Nro" : "Chasis Nro"}
            value={formData.vehicleFrameNro}
            onChange={handleVehicleFrameNro}
            required
            error={getInputErrorException(
              requiredError.error,
              getValueIsNotDefinedCondition(formData.vehicleFrameNro)
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              getValueIsNotDefinedCondition(formData.vehicleFrameNro)
            )}
          />
          <RenderIf condition={isNotBicycle}>
            <Input
              label='Motor Nro'
              value={formData.engineNro}
              onChange={handleEngineNro}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.engineNro)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.engineNro)
              )}
            />
          </RenderIf>
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Input
                label='Color'
                value={formData.color}
                onChange={handleColor}
                required
                error={getInputErrorException(
                  requiredError.error,
                  getValueIsNotDefinedCondition(formData.color)
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.color)
                )}
              />
            </ResponsiveItem>
            <RenderIf condition={isNotBicycle}>
              <ResponsiveItem>
                <Input
                  label='Dominio'
                  value={formData.plate}
                  onChange={handlePlate}
                  required
                  error={getInputErrorException(
                    requiredError.error,
                    getValueIsNotDefinedCondition(formData.plate)
                  )}
                  helperText={getInputErrorException(
                    requiredError.helperText,
                    getValueIsNotDefinedCondition(formData.plate)
                  )}
                />
              </ResponsiveItem>
            </RenderIf>
          </ResponsiveContainer>
        </ResponsiveItem>
      </FieldsContainer>
      <FormMessage
        open={formMessage.open}
        onClose={closeFormMessage}
        severity={formMessage.severity}
      >
        {formMessage.message}
      </FormMessage>
      <FormSettings
        unsavedData={unsavedVehicleData}
        isEdition={isEdition}
        onSubmit={submitForm}
        onRenew={renewVehicleSelected}
      />
    </FormContainer>
  );
};

export default memo(VehicleForm);
