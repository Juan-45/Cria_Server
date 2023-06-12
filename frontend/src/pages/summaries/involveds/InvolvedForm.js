import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FormContainer,
  FieldsContainer,
  FormMessage,
  FormSettings,
} from "components/FormStyles";
import { ResponsiveItem, ResponsiveContainer } from "components/CommonStyles";
import Select from "components/Select";
import Input from "components/Input";
import RenderIf from "components/RenderIf";
import { removeItemFrom } from "helpers/dataManagement";
import { getInputErrorException } from "helpers/error";

const INVOLVED_TYPES = [
  { val: "isVictim", label: "Vícitma" },
  { val: "isComplainant", label: "Denunciante" },
  { val: "isCausant", label: "Causante" },
  { val: "isAccused", label: "Imputado" },
];

const GENDERS = [
  {
    val: "masculino",
    label: "Masculino",
  },
  { val: "femenino", label: "Femenino" },
];

const EDUCATED = [
  {
    val: "sí",
    label: "Sí",
  },
  {
    val: "no",
    label: "No",
  },
];

const CIVIL_STATUS_MALE = [
  {
    val: "soltero",
    label: "Soltero",
  },
  {
    val: "casado",
    label: "Casado",
  },
  {
    val: "divorciado",
    label: "Divorciado",
  },
  {
    val: "viudo",
    label: "Viudo",
  },
];

const CIVIL_STATUS_FEMALE = [
  {
    val: "soltera",
    label: "Soltera",
  },
  {
    val: "casada",
    label: "Casada",
  },
  {
    val: "divorciada",
    label: "Divorciada",
  },
  {
    val: "viuda",
    label: "Viuda",
  },
];

const OCCUPATION_MALE = [
  {
    val: "empleado",
    label: "Empleado",
  },
  {
    val: "desocupado",
    label: "Desocupado",
  },
  {
    val: "jubilado/pensionado",
    label: "Jubilado/Pensionado",
  },
  {
    val: "amo de casa",
    label: "Amo de casa",
  },
  {
    val: "estudiante",
    label: "Estudiante",
  },
  {
    val: "comerciante",
    label: "Comerciante",
  },

  {
    val: "monotributista",
    label: "Monotributista",
  },
  {
    val: "changarin",
    label: "Changarin",
  },
];

const OCCUPATION_FEMALE = [
  {
    val: "empleada",
    label: "Empleada",
  },
  {
    val: "desocupada",
    label: "Desocupada",
  },
  {
    val: "jubilada/pensionada",
    label: "Jubilada/Pensionada",
  },
  {
    val: "ama de casa",
    label: "Ama de casa",
  },
  {
    val: "estudiante",
    label: "Estudiante",
  },
  {
    val: "comerciante",
    label: "Comerciante",
  },

  {
    val: "monotributista",
    label: "Monotributista",
  },
  {
    val: "changarin",
    label: "Changarin",
  },
];

const DEFAULT_FORM_DATA = {
  id: "",
  type: "",
  gender: "",
  fullName: "",
  nationality: "",
  education: "",
  civilStatus: "",
  occupation: "",
  age: "",
  birthDate: "",
  dni: "",
  phone: "",
  address: "",
  city: "Pergamino",
  province: "Buenos Aires",
  //isDetaineeFileNecessary
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

const setOptionsByGender = (gender, maleOptions, femaleOptions) => {
  const options = gender === "femenino" ? femaleOptions : maleOptions;
  return options;
};

//TODO: prioridad extra alta: optimizar re-render, ocurre que se re-renderiza toda la página al cambiar un campo
//de este form --Tal vez sea por re-referenciar objetos hardcodeados en el código, o pasados por props--
//TODO: prioridad alta: manejar selección de involucrado y actualización de formData

const InvolvedForm = ({
  setUnsavedFormDataConditions,
  involveds,
  unsavedInvolvedData,
  manageSummarySubmission,
}) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formMessage, setFormMessage] = useState(DEFAULT_FORM_MESSAGE);
  const [requiredError, setRequiredError] = useState(DEFAULT_REQUIRED_ERROR);

  const isEdition = formData.id !== "";

  console.log("ESTADOS InvolvedForm:", {
    formData,
    formMessage,
    requiredError,
  });

  const getValidFormData = (isDetaineeFileNecessary, formData) => {
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

    const required_keys = [
      "type",
      "fullName",
      "nationality",
      "education",
      "civilStatus",
      "occupation",
      "age",
      "birthDate",
      "dni",
      "phone",
      "address",
    ];
    const isDetaineeFileNecessary_required_keys = [
      "gender",
      "city",
      "province",
    ]; //A esto le falta las propiedades de lagajo

    if (isDetaineeFileNecessary) {
      const detaineeInvolvedData = {
        type: formData.type,
        fullName: formData.fullName,
        nationality: formData.nationality,
        education: formData.education,
        civilStatus: formData.civilStatus,
        occupation: formData.occupation,
        age: formData.age,
        birthDate: formData.birthDate,
        dni: formData.dni,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        gender: formData.gender,
        //Faltan las propiedades de legajo
      };

      let requiredError;

      [...required_keys, ...isDetaineeFileNecessary_required_keys].forEach(
        (required_key) => {
          const requiredValue = detaineeInvolvedData[required_key];
          if (requiredValue === "") {
            requiredError = true;
          }
        }
      );

      if (requiredError) {
        manageRequiredError();
      } else return detaineeInvolvedData;
    } else {
      const nonDetaineeInvolvedData = {
        type: formData.type,
        fullName: formData.fullName,
        nationality: formData.nationality,
        education: formData.education,
        civilStatus: formData.civilStatus,
        occupation: formData.occupation,
        age: formData.age,
        birthDate: formData.birthDate,
        dni: formData.dni,
        phone: formData.phone,
        address: formData.address,
      };

      let requiredError;

      required_keys.forEach((required_key) => {
        const requiredValue = nonDetaineeInvolvedData[required_key];
        if (requiredValue === "") {
          requiredError = true;
        }
      });

      if (requiredError) {
        manageRequiredError();
      } else return nonDetaineeInvolvedData;
    }
  };

  const closeFormMessage = () => {
    setFormMessage((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const setUnsavedDataHandler = (val) => {
    if (val) {
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        involveds: true,
      }));
      setFormMessage({
        open: true,
        severity: "warning",
        message: "En este formulario hay datos sin guardar.",
      });
    } else {
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        involveds: false,
      }));
      closeFormMessage();
    }
  };

  //On successful submission
  const unsetUnsavedDataHandler = useCallback(
    () =>
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        involveds: false,
      })),
    [setUnsavedFormDataConditions]
  );

  //Submit function only accesible for the user when unsavedInvolvedData is true thanks to FormSettings
  const submitForm = () => {
    //In case of requiredError returns null
    const validFormData = getValidFormData(
      formData.isDetaineeFileNecessary === "true",
      formData
    );

    if (validFormData) {
      let validData;

      if (isEdition) {
        const involvedsWithoutCurrent = removeItemFrom(involveds, formData.id);
        validData = [
          ...involvedsWithoutCurrent,
          { ...validFormData, id: formData.id },
        ];
      } else {
        const newId = uuidv4();
        if (involveds) {
          validData = [...involveds, { ...validFormData, id: newId }];
        } else {
          validData = [{ ...validFormData, id: newId }];
        }
      }

      console.log("DATOS INVOLVED FORM SUBMITTING", {
        validData,
        validFormData,
      });
      manageSummarySubmission(true, { involveds: validData });
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

  const renewInvolvedSelected = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setFormMessage(DEFAULT_FORM_MESSAGE);
    unsetUnsavedDataHandler();
  }, [unsetUnsavedDataHandler]);

  //Individual handlers for each field
  const handleType = (event) => {
    setUnsavedDataHandler(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleGender = (event) => {
    setUnsavedDataHandler(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      gender: event.target.value,
      occupation: "",
      civilStatus: "",
    }));
  };

  const handleFullName = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      fullName: value,
    }));
  };

  const handleNationality = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      nationality: value,
    }));
  };

  const handleEducation = (event) => {
    setUnsavedDataHandler(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      education: event.target.value,
    }));
  };

  const handleCivilStatus = (event) => {
    setUnsavedDataHandler(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      civilStatus: event.target.value,
    }));
  };

  const handleOccupation = (event) => {
    setUnsavedDataHandler(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      occupation: event.target.value,
    }));
  };

  const handleAge = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      age: value,
    }));
  };

  const handleBirthDate = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      birthDate: value,
    }));
  };

  const handleDni = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      dni: value,
    }));
  };

  const handlePhone = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleAddress = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      address: value,
    }));
  };

  const handleCity = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      city: value,
    }));
  };

  const handleProvince = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      province: value,
    }));
  };

  const valueIsNotDefault = {
    type: formData.type !== "" && true,
    gender: formData.gender !== "" && true,
    fullName: formData.fullName !== "" && true,
    nationality: formData.nationality !== "" && true,
    education: formData.education !== "" && true,
    civilStatus: formData.civilStatus !== "" && true,
    occupation: formData.occupation !== "" && true,
    age: formData.age !== "" && true,
    birthDate: formData.birthDate !== "" && true,
    dni: formData.dni !== "" && true,
    phone: formData.phone !== "" && true,
    address: formData.address !== "" && true,
    city: formData.city !== "" && true,
    province: formData.province !== "" && true,
  };

  return (
    <FormContainer className="column max1200">
      <FieldsContainer>
        <ResponsiveItem className="max-3-columns">
          <ResponsiveContainer className="paddingInBetween">
            <ResponsiveItem>
              <Select
                label="Tipo"
                value={formData.type}
                onChange={handleType}
                options={INVOLVED_TYPES}
                inputProps={{ disabled: isEdition }}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.type
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.type
                )}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label="Género"
                value={formData.gender}
                onChange={handleGender}
                options={GENDERS}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.gender
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.gender
                )}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
          <Input
            label="Apellido y nombre"
            value={formData.fullName}
            onChange={handleFullName}
            required
            error={getInputErrorException(
              requiredError.error,
              valueIsNotDefault.fullName
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              valueIsNotDefault.fullName
            )}
          />
          <ResponsiveContainer className="paddingInBetween">
            <ResponsiveItem>
              <Input
                label="Nacionalidad"
                value={formData.nationality}
                onChange={handleNationality}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.nationality
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.fullName
                )}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label="Instrucción"
                value={formData.education}
                onChange={handleEducation}
                options={EDUCATED}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.education
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.education
                )}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
        </ResponsiveItem>
        <ResponsiveItem className="max-3-columns">
          <ResponsiveContainer className="paddingInBetween">
            <ResponsiveItem>
              <Select
                label="Estado civil"
                value={formData.civilStatus}
                onChange={handleCivilStatus}
                options={setOptionsByGender(
                  formData.gender,
                  CIVIL_STATUS_MALE,
                  CIVIL_STATUS_FEMALE
                )}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.civilStatus
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.civilStatus
                )}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label="Ocupación"
                value={formData.occupation}
                onChange={handleOccupation}
                options={setOptionsByGender(
                  formData.gender,
                  OCCUPATION_MALE,
                  OCCUPATION_FEMALE
                )}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.occupation
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.occupation
                )}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
          <ResponsiveContainer className="paddingInBetween">
            <ResponsiveItem>
              <Input
                label="Edad"
                value={formData.age}
                onChange={handleAge}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.age
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.age
                )}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Input
                label="Fecha de nacimiento"
                value={formData.birthDate}
                onChange={handleBirthDate}
                required
                helperText={
                  requiredError.helperText
                    ? getInputErrorException(
                        requiredError.helperText,
                        valueIsNotDefault.birthDate
                      )
                    : "dd/mm/yyyy"
                }
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.birthDate
                )}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
          <ResponsiveContainer className="paddingInBetween">
            <ResponsiveItem>
              <Input
                label="DNI"
                value={formData.dni}
                onChange={handleDni}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.dni
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.dni
                )}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Input
                label="Teléfono"
                value={formData.phone}
                onChange={handlePhone}
                required
                error={getInputErrorException(
                  requiredError.error,
                  valueIsNotDefault.phone
                )}
                helperText={getInputErrorException(
                  requiredError.helperText,
                  valueIsNotDefault.phone
                )}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
        </ResponsiveItem>
        <ResponsiveItem className="max-3-columns">
          <Input
            label="Domicilio"
            value={formData.address}
            onChange={handleAddress}
            required
            helperText={
              requiredError.helperText
                ? getInputErrorException(
                    requiredError.helperText,
                    valueIsNotDefault.address
                  )
                : "Use formato calle nro. 111"
            }
            error={getInputErrorException(
              requiredError.error,
              valueIsNotDefault.address
            )}
          />
          <Input
            label="Localidad"
            value={formData.city}
            onChange={handleCity}
            required
            error={getInputErrorException(
              requiredError.error,
              valueIsNotDefault.city
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              valueIsNotDefault.city
            )}
          />
          <Input
            label="Provincia"
            value={formData.province}
            onChange={handleProvince}
            required
            error={getInputErrorException(
              requiredError.error,
              valueIsNotDefault.province
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              valueIsNotDefault.province
            )}
          />
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
        unsavedData={unsavedInvolvedData}
        isEdition={isEdition}
        onSubmit={submitForm}
        onRenew={renewInvolvedSelected}
      />
    </FormContainer>
  );
};

export default InvolvedForm;
