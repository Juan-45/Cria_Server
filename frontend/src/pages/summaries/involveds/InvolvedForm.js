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

const OCUPATION_MALE = [
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

const OCUPATION_FEMALE = [
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

const InvolvedForm = ({
  setUnsavedFormDataConditions,
  involveds,
  unsavedInvolvedData,
  manageSummarySubmission,
  setSummarySelected,
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
          if (requiredValue === "" || requiredValue === "default") {
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
        if (requiredValue === "" || requiredValue === "default") {
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
        validData = [...involvedsWithoutCurrent, validFormData];
      } else {
        const newId = uuidv4();
        validData = [...involveds, { ...validFormData, id: newId }];
      }

      manageSummarySubmission(isEdition, { involveds: validData });
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

  return (
    <FormContainer className='column max1200'>
      <FieldsContainer>
        <ResponsiveItem className='max-3-columns'>
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Select
                label='Tipo'
                // value={formData.type}
                //onChange={handleType}
                options={INVOLVED_TYPES}
                //  inputProps={{ disabled: isEdition }}
                required
                //disabled en caso de involucrado seleccionado
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label='Género'
                // value={formData.type}
                // onChange={handleType}
                options={GENDERS}
                required
              />
            </ResponsiveItem>
          </ResponsiveContainer>

          <Input
            label='Apellido y nombre'
            //value={formData.ipp}

            onChange={() => {}}
            required
          />
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Input
                label='Nacionalidad'
                // value={formData.type}
                //onChange={handleType}
                onChange={() => {}}
                required
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label='Instrucción'
                // value={formData.type}
                // onChange={handleType}
                options={EDUCATED}
                required
              />
            </ResponsiveItem>
          </ResponsiveContainer>
        </ResponsiveItem>
        <ResponsiveItem className='max-3-columns'>
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Select
                label='Estado civil'
                // value={formData.type}
                // onChange={handleType}
                options={CIVIL_STATUS_MALE}
                required
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Select
                label='Ocupación'
                // value={formData.type}
                // onChange={handleType}
                options={OCUPATION_MALE}
                required
              />
            </ResponsiveItem>
          </ResponsiveContainer>
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Input
                label='Edad'
                // value={formData.type}
                // onChange={handleType}
                onChange={() => {}}
                required
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Input
                label='Fecha de nacimiento'
                // value={formData.type}
                // onChange={handleType}
                required
                /* helperText={
                    requiredError.helperText
                      ? requiredError.helperText
                      : "Use formato dd/mm/yyyy"
                  }*/
                onChange={() => {}}
              />
            </ResponsiveItem>
          </ResponsiveContainer>
          <ResponsiveContainer className='paddingInBetween'>
            <ResponsiveItem>
              <Input
                label='DNI'
                // value={formData.type}
                // onChange={handleType}
                required
                onChange={() => {}}
              />
            </ResponsiveItem>
            <ResponsiveItem>
              <Input
                label='Teléfono'
                // value={formData.type}
                // onChange={handleType}
                onChange={() => {}}
                required
              />
            </ResponsiveItem>
          </ResponsiveContainer>
        </ResponsiveItem>

        <ResponsiveItem className='max-3-columns'>
          <Input
            label='Domicilio'
            //value={formData.ipp}

            onChange={() => {}}
            required
            /* helperText={
                    requiredError.helperText
                      ? requiredError.helperText
                      : "Use formato calle nro. 111"
                  }*/
          />
          <Input
            label='Localidad'
            //value={formData.ipp}

            onChange={() => {}}
            required
          />
          <Input
            label='Provincia'
            //value={formData.ipp}

            onChange={() => {}}
            required
          />
        </ResponsiveItem>
      </FieldsContainer>
      <FormMessage
      /*  open={formMessage.open}
        onClose={closeFormMessage}
        severity={formMessage.severity}*/
      >
        {/*formMessage.message*/}
      </FormMessage>
      <FormSettings
      /* unsavedData={unsavedInitialData}
        isEdition={isEdition}
        onSubmit={submitForm}
        onRenew={renewSummarySelected}*/
      />
    </FormContainer>
  );
};

export default InvolvedForm;
