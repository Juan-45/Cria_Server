import { memo } from "react";
import {
  getInputErrorException,
  getValueIsNotDefinedCondition,
} from "helpers/error";
import { FieldsContainer } from "components/FormStyles";
import { ResponsiveItem, ResponsiveContainer } from "components/CommonStyles";
import Select from "components/Select";
import Input from "components/Input";
import Checkbox from "components/Checkbox";
import RenderIf from "components/RenderIf";

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

const PersonalData = ({
  formData,
  isEdition,
  setFormData,
  requiredError,
  setOptionsByGender,
  isAccusedOrCausant,
  isDetaineeFileDataReady,
}) => {
  //Individual handlers for each field
  const handleType = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleGender = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: event.target.value,
      occupation: "",
      civilStatus: "",
    }));
  };

  const handleFullName = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      fullName: value,
    }));
  };

  const handleNationality = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      nationality: value,
    }));
  };

  const handleEducation = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      education: event.target.value,
    }));
  };

  const handleCivilStatus = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      civilStatus: event.target.value,
    }));
  };

  const handleOccupation = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      occupation: event.target.value,
    }));
  };

  const handleAge = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      age: value,
    }));
  };

  const handleBirthDate = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      birthDate: value,
    }));
  };

  const handleDni = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      dni: value,
    }));
  };

  const handlePhone = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleAddress = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      address: value,
    }));
  };

  const handleCity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      city: value,
    }));
  };

  const handleProvince = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      province: value,
    }));
  };

  const handleIsDetaineeFileNecessary = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      isDetaineeFileNecessary: value,
    }));
  };
  return (
    <FieldsContainer>
      <ResponsiveItem className='max-3-columns'>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Select
              label='Tipo'
              value={formData.type}
              onChange={handleType}
              options={INVOLVED_TYPES}
              inputProps={{ disabled: isEdition }}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.type)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.type)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Select
              label='Género'
              value={formData.gender}
              onChange={handleGender}
              options={GENDERS}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.gender)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.gender)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <Input
          label='Apellido y nombre'
          value={formData.fullName}
          onChange={handleFullName}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.fullName)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.fullName)
          )}
        />
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Nacionalidad'
              value={formData.nationality}
              onChange={handleNationality}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.nationality)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.nationality)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Select
              label='Instrucción'
              value={formData.education}
              onChange={handleEducation}
              options={EDUCATED}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.education)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.education)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
      </ResponsiveItem>
      <ResponsiveItem className='max-3-columns'>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Select
              label='Estado civil'
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
                getValueIsNotDefinedCondition(formData.civilStatus)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.civilStatus)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Select
              label='Ocupación'
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
                getValueIsNotDefinedCondition(formData.occupation)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.occupation)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Edad'
              value={formData.age}
              onChange={handleAge}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.age)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.age)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Fecha de nacimiento'
              value={formData.birthDate}
              onChange={handleBirthDate}
              required
              helperText={
                requiredError.helperText
                  ? getInputErrorException(
                      requiredError.helperText,
                      getValueIsNotDefinedCondition(formData.birthDate)
                    )
                  : "dd/mm/yyyy"
              }
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.birthDate)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='DNI'
              value={formData.dni}
              onChange={handleDni}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.dni)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.dni)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Teléfono'
              value={formData.phone}
              onChange={handlePhone}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.phone)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.phone)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
      </ResponsiveItem>
      <ResponsiveItem className='max-3-columns'>
        <Input
          label='Domicilio'
          value={formData.address}
          onChange={handleAddress}
          required
          helperText={
            requiredError.helperText
              ? getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.address)
                )
              : "Use formato calle nro. 111"
          }
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.address)
          )}
        />
        <Input
          label='Localidad'
          value={formData.city}
          onChange={handleCity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.city)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.city)
          )}
        />
        <Input
          label='Provincia'
          value={formData.province}
          onChange={handleProvince}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.province)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.province)
          )}
        />
        <RenderIf condition={isAccusedOrCausant}>
          <Checkbox
            label='Legajo necesario'
            value={formData.isDetaineeFileNecessary}
            onChange={handleIsDetaineeFileNecessary}
            disabled={isDetaineeFileDataReady}
          />
        </RenderIf>
      </ResponsiveItem>
    </FieldsContainer>
  );
};

export default memo(PersonalData);
