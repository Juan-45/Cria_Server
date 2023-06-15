import { useState, useEffect, useCallback, useMemo, memo } from "react";
import useUnsavedFormData from "hooks/useUnsavedFormData";
import { v4 as uuidv4 } from "uuid";
import {
  removeItemFrom,
  getPropertiesFrom,
  getInvolvedsNames_by,
} from "helpers/dataManagement";
import { Typography } from "@mui/material";
import {
  FormContainer,
  FormMessage,
  FormSettings,
} from "components/FormStyles";
import { Divider } from "components/CommonStyles";
import RenderIf from "components/RenderIf";
import PersonalData from "pages/summaries/involveds/involvedForm/PersonalData";
import DetaineeFileInitialData from "pages/summaries/involveds/involvedForm/DetaineeFileInitialData";
import PhysicalFeatures from "pages/summaries/involveds/involvedForm/PhysicalFeatures";

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
  //Detainee File data
  city: "Pergamino",
  province: "Buenos Aires",
  isDetaineeFileNecessary: "false",
  //
  detaineeStatus: "",
  nickName: "",
  fatherFullName: "",
  motherFullName: "",
  arrestDate: "",
  arrestAddress: "",
  felonyDate: "",
  felonyAddress: "",
  //physical features
  aspect: "Normal",
  bodyBuild: "Delgado",
  height: "1.70 mts",
  physicalDefects: "No posee",
  skindColor: "Blanco",
  hairColor: "Negro",
  beardColor: "No posee",
  beardPeculiarity: "No posee",
  forehead: "Normal",
  foreheadPeculiarity: "No posee",
  eyelids: "Normales",
  eyelidsPeculiarity: "No posee",
  irisColor: "Marrón",
  irisPeculiarity: "No posee",
  noseProfile: "Recto",
  noseBase: "Fina",
  nosePeculiarity: "No posee",
  mouthSize: "Normal",
  mouthForm: "Normal",
  mouthPeculiarity: "No posee",
  lips: "Normales",
  chin: "Normal",
  lips_chinPeculiarity: "No posee",
  ears: "Normales",
  earsPeculiarity: "No posee",
  //distinctive marks and scars
  physicalPeculiarity: "No posee",
  headAndNeckPeculiarity: "No posee",
  rightHandPeculiarity: "No posee",
  leftHandPeculiarity: "No posee",
  rightLegPeculiarity: "No posee",
  leftLegPeculiarity: "No posee",
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

const InvolvedForm = ({
  setUnsavedFormDataConditions,
  setInvolvedSelected,
  involveds,
  involvedSelected,
  unsavedInvolvedData,
  manageSummarySubmission,
}) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formMessage, setFormMessage] = useState(DEFAULT_FORM_MESSAGE);
  const [requiredError, setRequiredError] = useState(DEFAULT_REQUIRED_ERROR);

  const isEdition = formData.id !== "";
  const isDetaineeFileNecessary = formData.isDetaineeFileNecessary === "true";
  //In case involved is saved with detainee file data, when selected the following boolean does exist and must be true, otherwise undefined
  const isDetaineeFileDataReady = formData.isDetaineeFileDataReady;
  const isAccusedOrCausant =
    formData.type === "isAccused" || formData.type === "isCausant";

  /* console.log("VARIABLES SINC InvolvedForm:", {
    isEdition,
    isDetaineeFileNecessary,
    isDetaineeFileDataReady,
    isAccusedOrCausant,
  });*/

  /* console.log("ESTADOS InvolvedForm:", {
    formData,
    formMessage,
    requiredError,
  });*/

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

    const excludedProperties = [
      "id",
      "isDetaineeFileNecessary",
      "isDetaineeFileDataReady",
    ];

    const isDetaineeFileNecessary_required_keys = getPropertiesFrom(
      DEFAULT_FORM_DATA,
      excludedProperties
    );

    if (isDetaineeFileNecessary) {
      const { id, ...detaineeInvolvedData } = formData;

      let requiredError;

      isDetaineeFileNecessary_required_keys.forEach((required_key) => {
        const requiredValue = detaineeInvolvedData[required_key];
        if (requiredValue === "") {
          requiredError = true;
        }
      });

      if (requiredError) {
        manageRequiredError();
      } else return { ...detaineeInvolvedData, isDetaineeFileDataReady: true };
    } else {
      const nonDetaineeInvolvedData = {
        type: formData.type,
        gender: formData.gender,
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

  const setUnsavedDataHandler = useCallback(
    (condition) => {
      if (condition) {
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
        involveds: false,
      })),
    [setUnsavedFormDataConditions]
  );

  //Submit function only accesible for the user when unsavedInvolvedData is true thanks to FormSettings
  const submitForm = () => {
    //In case of requiredError returns null
    const validFormData = getValidFormData(isDetaineeFileNecessary, formData);

    if (validFormData) {
      let validData;

      if (isEdition) {
        const involvedsWithoutCurrent = removeItemFrom(involveds, formData.id);
        validData = [
          ...involvedsWithoutCurrent,
          { ...validFormData, id: formData.id },
        ];
        setInvolvedSelected({ ...validFormData, id: formData.id });
      } else {
        const newId = uuidv4();
        if (involveds) {
          validData = [...involveds, { ...validFormData, id: newId }];
        } else {
          validData = [{ ...validFormData, id: newId }];
        }
        setInvolvedSelected({ ...validFormData, id: newId });
      }

      manageSummarySubmission(true, {
        involveds: validData,
        victims: getInvolvedsNames_by("isVictim", validData),
        complainants: getInvolvedsNames_by("isComplainant", validData),
        causants: getInvolvedsNames_by("isCausant", validData),
        accuseds: getInvolvedsNames_by("isAccused", validData),
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

  const renewInvolvedSelected = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setFormMessage(DEFAULT_FORM_MESSAGE);
    setInvolvedSelected(null);
    unsetUnsavedDataHandler();
  }, [unsetUnsavedDataHandler, setInvolvedSelected]);

  //To manage unsaved field data
  const getSpredKeys = useCallback((obj, isDetaineeFileNecessary) => {
    if (isDetaineeFileNecessary) {
      const { isDetaineeFileDataReady, ...detaineeFileData } = obj;
      return detaineeFileData;
    } else {
      const {
        type,
        gender,
        fullName,
        nationality,
        education,
        civilStatus,
        occupation,
        age,
        birthDate,
        dni,
        phone,
        address,
      } = obj;

      return {
        type,
        gender,
        fullName,
        nationality,
        education,
        civilStatus,
        occupation,
        age,
        birthDate,
        dni,
        phone,
        address,
      };
    }
  }, []);

  const fieldsData = useMemo(
    () => getSpredKeys(formData, isDetaineeFileNecessary),
    [formData, isDetaineeFileNecessary, getSpredKeys]
  );

  useUnsavedFormData({
    setUnsavedDataHandler,
    fieldsData,
    comparisonData: isEdition ? involvedSelected : DEFAULT_FORM_DATA,
  });

  useEffect(() => {
    const getFormDataValuesFrom = (involvedSelected) => {
      const commonValues = {
        id: involvedSelected.id,
        type: involvedSelected.type,
        gender: involvedSelected.gender,
        fullName: involvedSelected.fullName,
        nationality: involvedSelected.nationality,
        education: involvedSelected.education,
        civilStatus: involvedSelected.civilStatus,
        occupation: involvedSelected.occupation,
        age: involvedSelected.age,
        birthDate: involvedSelected.birthDate,
        dni: involvedSelected.dni,
        phone: involvedSelected.phone,
        address: involvedSelected.address,
      };

      if (involvedSelected.isDetaineeFileNecessary === "true") {
        return { ...involvedSelected, isDetaineeFileDataReady: true };
      } else if (
        involvedSelected.type === "isAccused" ||
        involvedSelected.type === "isCausant"
      ) {
        //To be able to set isDetaineeFileNecessary to true, and then used the default detaineeFile's values
        return { ...DEFAULT_FORM_DATA, ...commonValues };
      } else {
        //To maintain the default values of city and province, it's used the spread operator
        return {
          ...commonValues,
          city: DEFAULT_FORM_DATA.city,
          province: DEFAULT_FORM_DATA.province,
        };
      }
    };

    if (involvedSelected) {
      //In case of involvedSelected changes from parent component, update local state if id is different
      if (involvedSelected.id !== formData.id) {
        setFormData(getFormDataValuesFrom(involvedSelected));
        if (isEdition) {
          setFormMessage(DEFAULT_FORM_MESSAGE);
          setRequiredError(DEFAULT_REQUIRED_ERROR);
        }
      }
    } else {
      //In case of involvedSelected is null, reset formData to default values
      if (isEdition) {
        renewInvolvedSelected();
      }
    }
  }, [involvedSelected, formData.id, isEdition, renewInvolvedSelected]);

  const personalData_formData = useMemo(
    () => ({
      type: formData.type,
      gender: formData.gender,
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
      isDetaineeFileNecessary: formData.isDetaineeFileNecessary,
    }),
    [
      formData.type,
      formData.gender,
      formData.fullName,
      formData.nationality,
      formData.education,
      formData.civilStatus,
      formData.occupation,
      formData.age,
      formData.birthDate,
      formData.dni,
      formData.phone,
      formData.address,
      formData.city,
      formData.province,
      formData.isDetaineeFileNecessary,
    ]
  );

  const detaineeFileInitialData = useMemo(
    () => ({
      detaineeStatus: formData.detaineeStatus,
      nickName: formData.nickName,
      fatherFullName: formData.fatherFullName,
      motherFullName: formData.motherFullName,
      arrestDate: formData.arrestDate,
      arrestAddress: formData.arrestAddress,
      felonyDate: formData.felonyDate,
      felonyAddress: formData.felonyAddress,
    }),
    [
      formData.detaineeStatus,
      formData.nickName,
      formData.fatherFullName,
      formData.motherFullName,
      formData.arrestDate,
      formData.arrestAddress,
      formData.felonyDate,
      formData.felonyAddress,
    ]
  );

  const detaineeFilePhysicalFeatures = useMemo(
    () => ({
      aspect: formData.aspect,
      bodyBuild: formData.bodyBuild,
      height: formData.height,
      physicalDefects: formData.physicalDefects,
      skindColor: formData.skindColor,
      hairColor: formData.hairColor,
      beardColor: formData.beardColor,
      beardPeculiarity: formData.beardPeculiarity,
      forehead: formData.forehead,
      foreheadPeculiarity: formData.foreheadPeculiarity,
      eyelids: formData.eyelids,
      eyelidsPeculiarity: formData.eyelidsPeculiarity,
      irisColor: formData.irisColor,
      irisPeculiarity: formData.irisPeculiarity,
      noseProfile: formData.noseProfile,
      noseBase: formData.noseBase,
      nosePeculiarity: formData.nosePeculiarity,
      mouthSize: formData.mouthSize,
      mouthForm: formData.mouthForm,
      mouthPeculiarity: formData.mouthPeculiarity,
      lips: formData.lips,
      chin: formData.chin,
      lips_chinPeculiarity: formData.lips_chinPeculiarity,
      ears: formData.ears,
      earsPeculiarity: formData.earsPeculiarity,
      //distinctive marks and scars
      physicalPeculiarity: formData.physicalPeculiarity,
      headAndNeckPeculiarity: formData.headAndNeckPeculiarity,
      rightHandPeculiarity: formData.rightHandPeculiarity,
      leftHandPeculiarity: formData.leftHandPeculiarity,
      rightLegPeculiarity: formData.rightLegPeculiarity,
      leftLegPeculiarity: formData.leftLegPeculiarity,
    }),
    [
      formData.aspect,
      formData.bodyBuild,
      formData.height,
      formData.physicalDefects,
      formData.skindColor,
      formData.hairColor,
      formData.beardColor,
      formData.beardPeculiarity,
      formData.forehead,
      formData.foreheadPeculiarity,
      formData.eyelids,
      formData.eyelidsPeculiarity,
      formData.irisColor,
      formData.irisPeculiarity,
      formData.noseProfile,
      formData.noseBase,
      formData.nosePeculiarity,
      formData.mouthSize,
      formData.mouthForm,
      formData.mouthPeculiarity,
      formData.lips,
      formData.chin,
      formData.lips_chinPeculiarity,
      formData.ears,
      formData.earsPeculiarity,
      //distinctive marks and scars
      formData.physicalPeculiarity,
      formData.headAndNeckPeculiarity,
      formData.rightHandPeculiarity,
      formData.leftHandPeculiarity,
      formData.rightLegPeculiarity,
      formData.leftLegPeculiarity,
    ]
  );

  return (
    <FormContainer className='column max1200'>
      <PersonalData
        formData={personalData_formData}
        isEdition={isEdition}
        setFormData={setFormData}
        requiredError={requiredError}
        setOptionsByGender={setOptionsByGender}
        isAccusedOrCausant={isAccusedOrCausant}
        isDetaineeFileDataReady={isDetaineeFileDataReady}
      />
      <RenderIf condition={isDetaineeFileNecessary}>
        <Divider />
        <Typography variant='h3'>Datos para legajo</Typography>
        <DetaineeFileInitialData
          formData={detaineeFileInitialData}
          setFormData={setFormData}
          requiredError={requiredError}
          setOptionsByGender={setOptionsByGender}
        />
        <Typography variant='h3'>Características físicas</Typography>
        <PhysicalFeatures
          formData={detaineeFilePhysicalFeatures}
          setFormData={setFormData}
          requiredError={requiredError}
        />
      </RenderIf>
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

export default memo(InvolvedForm);
