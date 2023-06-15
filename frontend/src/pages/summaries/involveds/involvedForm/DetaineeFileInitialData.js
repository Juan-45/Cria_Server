import { memo } from "react";
import {
  getInputErrorException,
  getValueIsNotDefinedCondition,
} from "helpers/error";
import { FieldsContainer } from "components/FormStyles";
import { ResponsiveItem } from "components/CommonStyles";
import Select from "components/Select";
import Input from "components/Input";

const DETAINEE_STATUS_FEMALE = [
  {
    val: "aprehendida",
    label: "Aprenhendida",
  },
  {
    val: "detenida",
    label: "Detenida",
  },
];

const DETAINEE_STATUS_MALE = [
  {
    val: "aprehendido",
    label: "Aprenhendido",
  },
  {
    val: "detenido",
    label: "Detenido",
  },
];

const DetaineeFileInitialData = ({
  formData,
  setOptionsByGender,
  requiredError,
  setFormData,
}) => {
  const handleDetaineeStatus = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      detaineeStatus: event.target.value,
    }));
  };

  const handleNickName = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      nickName: value,
    }));
  };

  const handleFatherFullName = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      fatherFullName: value,
    }));
  };

  const handleMotherFullName = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      motherFullName: value,
    }));
  };

  const handleArrestDate = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      arrestDate: value,
    }));
  };

  const handleArrestAddress = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      arrestAddress: value,
    }));
  };

  const handleFelonyDate = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      felonyDate: value,
    }));
  };

  const handleFelonyAddress = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      felonyAddress: value,
    }));
  };

  return (
    <FieldsContainer>
      <ResponsiveItem className='max-3-columns'>
        <Select
          label='Estado'
          value={formData.detaineeStatus}
          onChange={handleDetaineeStatus}
          options={setOptionsByGender(
            formData.detaineeStatus,
            DETAINEE_STATUS_MALE,
            DETAINEE_STATUS_FEMALE
          )}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.detaineeStatus)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.detaineeStatus)
          )}
        />
        <Input
          label='Apodo'
          value={formData.nickName}
          onChange={handleNickName}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.nickName)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.nickName)
          )}
        />
        <Input
          label='Apellido y nombre progenitor'
          value={formData.fatherFullName}
          onChange={handleFatherFullName}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.fatherFullName)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.fatherFullName)
          )}
        />
        <Input
          label='Apellido y nombre progenitora'
          value={formData.motherFullName}
          onChange={handleMotherFullName}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.motherFullName)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.motherFullName)
          )}
        />
      </ResponsiveItem>
      <ResponsiveItem className='max-3-columns'>
        <Input
          label='Lugar de aprehensión/detención'
          value={formData.arrestAddress}
          onChange={handleArrestAddress}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.arrestAddress)
          )}
          helperText={
            requiredError.helperText
              ? getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.arrestAddress)
                )
              : "Use formato calle nro. 111"
          }
        />
        <Input
          label='Fecha de aprehensión/detención'
          value={formData.arrestDate}
          onChange={handleArrestDate}
          required
          helperText={
            requiredError.helperText
              ? getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.arrestDate)
                )
              : "dd/mm/yyyy"
          }
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.arrestDate)
          )}
        />
      </ResponsiveItem>
      <ResponsiveItem className='max-3-columns'>
        <Input
          label='Lugar del hecho'
          value={formData.felonyAddress}
          onChange={handleFelonyAddress}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.felonyAddress)
          )}
          helperText={
            requiredError.helperText
              ? getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.felonyAddress)
                )
              : "Use formato calle nro. 111"
          }
        />
        <Input
          label='Fecha del hecho'
          value={formData.felonyDate}
          onChange={handleFelonyDate}
          required
          helperText={
            requiredError.helperText
              ? getInputErrorException(
                  requiredError.helperText,
                  getValueIsNotDefinedCondition(formData.felonyDate)
                )
              : "dd/mm/yyyy"
          }
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.felonyDate)
          )}
        />
      </ResponsiveItem>
    </FieldsContainer>
  );
};

export default memo(DetaineeFileInitialData);
