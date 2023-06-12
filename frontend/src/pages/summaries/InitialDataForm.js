import { useState, useEffect, useCallback, memo } from "react";
import {
  FormContainer,
  FieldsContainer,
  FormMessage,
  FormSettings,
} from "components/FormStyles";
import Select from "components/Select";
import Input from "components/Input";
import RenderIf from "components/RenderIf";
import Combobox from "components/Combobox";
import { ResponsiveItem } from "components/CommonStyles";
import { getInputErrorException } from "helpers/error";
import { verifyPropsReferences } from "helpers/development_debuggin";

const SUMMARY_TYPES = [
  { val: "isSummary", label: "Actuaciones por hecho" },
  { val: "isWhereabouts", label: "Actuaciones por paradero" },
  {
    val: "isCapture",
    label: "Actuaciones por captura",
  },
];

const DEFAULT_FORM_DATA = {
  id: "",
  version_id: "",
  type: SUMMARY_TYPES[0].val,
  cover: "",
  ipp: "",
  instructor: "",
  instructor_rank: "",
  instructor_id: "",
  instructor_obj: { val: "", id: "" },
  //type isSummary
  prosecution: "",
  prosecutor: "",
  prosecution_id: "",
  prosecution_obj: { val: "", id: "" },
  court: "",
  judge: "",
  court_id: "",
  court_obj: { val: "", id: "" },
  //type isWhereabouts or isCapture
  judicialBody: "",
  isn: "",
  requestDate: "",
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

const InitialDataForm = ({
  ps_data,
  setUnsavedFormDataConditions,
  summarySelected,
  unsavedInitialData,
  manageSummarySubmission,
  setSummarySelected,
}) => {
  verifyPropsReferences(
    {
      ps_data,
      setUnsavedFormDataConditions,
      summarySelected,
      unsavedInitialData,
      manageSummarySubmission,
      setSummarySelected,
    },
    "InitialDataForm - props"
  );

  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formMessage, setFormMessage] = useState(DEFAULT_FORM_MESSAGE);
  const [requiredError, setRequiredError] = useState(DEFAULT_REQUIRED_ERROR);

  const isEdition = formData.id !== "";

  console.log("ESTADOS InitialData:", { formData, formMessage, requiredError });

  const getValidInitialData = (isSummary, formData) => {
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

    const required_keys = ["cover", "instructor_id"];
    const summary_required_keys = ["prosecution_id", "court_id"];
    const nonSummary_required_keys = ["judicialBody", "isn", "requestDate"];

    if (isSummary) {
      const summaryInitialData = {
        type: formData.type,
        cover: formData.cover,
        summary_by: formData.cover,
        ipp: formData.ipp,
        instructor: formData.instructor,
        instructor_rank: formData.instructor_rank,
        instructor_id: formData.instructor_id,
        prosecution: formData.prosecution,
        prosecutor: formData.prosecutor,
        prosecution_id: formData.prosecution_id,
        court: formData.court,
        judge: formData.judge,
        court_id: formData.court_id,
      };

      let requiredError;

      [...required_keys, ...summary_required_keys].forEach((required_key) => {
        const requiredValue = summaryInitialData[required_key];
        if (requiredValue === "") {
          requiredError = true;
        }
      });

      if (requiredError) {
        manageRequiredError();
      } else return summaryInitialData;
    } else {
      const nonSummaryInitialData = {
        type: formData.type,
        cover: formData.cover,
        summary_by: `${formData.cover} - ${
          formData.type === "isWhereabouts" ? "Paradero" : "Captura"
        }`,
        ipp: formData.ipp,
        instructor: formData.instructor,
        instructor_rank: formData.instructor_rank,
        instructor_id: formData.instructor_id,
        judicialBody: formData.judicialBody,
        isn: formData.isn,
        requestDate: formData.requestDate,
      };

      let requiredError;

      [...required_keys, ...nonSummary_required_keys].forEach(
        (required_key) => {
          const requiredValue = nonSummaryInitialData[required_key];
          if (requiredValue === "") {
            requiredError = true;
          }
        }
      );

      if (requiredError) {
        manageRequiredError();
      } else return nonSummaryInitialData;
    }
  };

  const closeFormMessage = () => {
    setFormMessage((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  //Reset initialData unsaved condition
  const unsetUnsavedDataHandler = useCallback(
    () =>
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        initialData: false,
      })),
    [setUnsavedFormDataConditions]
  );

  const setUnsavedDataHandler = (val) => {
    if (val) {
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        initialData: true,
      }));
      setFormMessage({
        open: true,
        severity: "warning",
        message: "En este formulario hay datos sin guardar.",
      });
    } else {
      unsetUnsavedDataHandler();
      closeFormMessage();
    }
  };

  //Submit function only accesible for the user when unsavedInitialData is true thanks to FormSettings
  const submitForm = () => {
    //In case of requiredError returns null
    const validData = getValidInitialData(
      formData.type === "isSummary",
      formData
    );

    if (validData) {
      manageSummarySubmission(isEdition, validData);
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

  const renewSummarySelected = useCallback(() => {
    setSummarySelected(null);
    setFormData(DEFAULT_FORM_DATA);
    setFormMessage(DEFAULT_FORM_MESSAGE);
    unsetUnsavedDataHandler();
  }, [setSummarySelected, unsetUnsavedDataHandler]);

  //Individual handlers for each field
  const handleType = (event) => {
    //To reset requiredError changing the interface
    setRequiredError(DEFAULT_REQUIRED_ERROR);
    setFormData((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleCover = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      cover: value,
    }));
  };

  const handleIpp = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      ipp: value,
    }));
  };

  const handleInstructor = (newValue) => {
    setUnsavedDataHandler(newValue.val);
    setFormData((prevState) => ({
      ...prevState,
      instructor: newValue.val,
      instructor_id: newValue.id,
      instructor_rank: newValue.adj,
    }));
  };

  const handleProsecution = (newValue) => {
    setUnsavedDataHandler(newValue.val);
    setFormData((prevState) => ({
      ...prevState,
      prosecution: newValue.val,
      prosecution_id: newValue.id,
      prosecutor: newValue.adj,
    }));
  };

  const handleCourt = (newValue) => {
    setUnsavedDataHandler(newValue.val);
    setFormData((prevState) => ({
      ...prevState,
      court: newValue.val,
      court_id: newValue.id,
      judge: newValue.adj,
    }));
  };

  const handleJudicialBody = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      judicialBody: value,
    }));
  };

  const handleIsn = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      isn: value,
    }));
  };

  const handleRequestDate = (value) => {
    setUnsavedDataHandler(value);
    setFormData((prevState) => ({
      ...prevState,
      requestDate: value,
    }));
  };

  const valueIsNotDefault = {
    cover: formData.cover !== "" && true,
    instructor: formData.instructor !== "" && true,
    prosecution: formData.prosecution !== "" && true,
    court: formData.court !== "" && true,
    judicialBody: formData.judicialBody !== "" && true,
    isn: formData.isn !== "" && true,
    requestDate: formData.requestDate !== "" && true,
  };

  useEffect(() => {
    const getFormDataValuesFrom = (selectedSummary) => {
      const commonValues = {
        id: selectedSummary.id,
        version_id: selectedSummary.version_id,
        type: selectedSummary.type,
        cover: selectedSummary.cover,
        ipp: selectedSummary.ipp,
        instructor: selectedSummary.instructor,
        instructor_rank: selectedSummary.instructor_rank,
        instructor_id: selectedSummary.instructor_id,
      };

      const summaryValues = {
        prosecution: selectedSummary.prosecution,
        prosecutor: selectedSummary.prosecutor,
        prosecution_id: selectedSummary.prosecution_id,
        court: selectedSummary.court,
        judge: selectedSummary.judge,
        court_id: selectedSummary.court_id,
      };

      const nonSummaryValues = {
        judicialBody: selectedSummary.judicialBody,
        isn: selectedSummary.isn,
        requestDate: selectedSummary.requestDate,
      };

      if (selectedSummary.type === "isSummary") {
        return { ...commonValues, ...summaryValues };
      } else {
        return { ...commonValues, ...nonSummaryValues };
      }
    };

    if (summarySelected) {
      //In case of summarySelected changes from parent component, update local state if id is different
      if (summarySelected.id !== formData.id) {
        setFormData(getFormDataValuesFrom(summarySelected));
        if (formData.id !== "") {
          setFormMessage(DEFAULT_FORM_MESSAGE);
        }
      } else if (summarySelected.version_id !== formData.version_id) {
        setFormData(getFormDataValuesFrom(summarySelected));
      }
    } else {
      //In case of summarySelected is null, reset formData to default values
      if (isEdition) {
        renewSummarySelected();
      }
    }
  }, [
    summarySelected,
    formData.id,
    formData.version_id,
    isEdition,
    renewSummarySelected,
  ]);
  return (
    <FormContainer className="column max900">
      <FieldsContainer>
        <ResponsiveItem>
          <Select
            label="Tipo de actuación"
            value={formData.type}
            onChange={handleType}
            options={SUMMARY_TYPES}
            inputProps={{ disabled: isEdition }}
          />
          <Input
            label="Carátula"
            value={formData.cover}
            onChange={handleCover}
            required
            error={getInputErrorException(
              requiredError.error,
              valueIsNotDefault.cover
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              valueIsNotDefault.cover
            )}
          />
          <Input label="IPP" value={formData.ipp} onChange={handleIpp} />
          <Combobox
            label="Instructor"
            options={ps_data.instructors}
            onChange={handleInstructor}
            value={{
              val: formData.instructor,
              id: formData.instructor_id,
              adj: formData.instructor_rank,
            }}
            required
            error={getInputErrorException(
              requiredError.error,
              valueIsNotDefault.instructor
            )}
            helperText={getInputErrorException(
              requiredError.helperText,
              valueIsNotDefault.instructor
            )}
          />
        </ResponsiveItem>
        <ResponsiveItem>
          <RenderIf condition={formData.type === "isSummary"}>
            <Combobox
              label="Fiscalía"
              options={ps_data.prosecutions}
              onChange={handleProsecution}
              value={{
                val: formData.prosecution,
                id: formData.prosecution_id,
                adj: formData.prosecutor,
              }}
              required
              error={getInputErrorException(
                requiredError.error,
                valueIsNotDefault.prosecution
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                valueIsNotDefault.prosecution
              )}
            />
            <Combobox
              label="Juzg. Gtias."
              options={ps_data.courts}
              onChange={handleCourt}
              value={{
                val: formData.court,
                id: formData.court_id,
                adj: formData.judge,
              }}
              required
              error={getInputErrorException(
                requiredError.error,
                valueIsNotDefault.court
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                valueIsNotDefault.court
              )}
            />
          </RenderIf>
          <RenderIf condition={formData.type !== "isSummary"}>
            <Input
              label="Órgano judicial interviniente"
              value={formData.judicialBody}
              onChange={handleJudicialBody}
              required
              error={getInputErrorException(
                requiredError.error,
                valueIsNotDefault.judicialBody
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                valueIsNotDefault.judicialBody
              )}
            />
            <Input
              label="ISN"
              value={formData.isn}
              onChange={handleIsn}
              required
              error={getInputErrorException(
                requiredError.error,
                valueIsNotDefault.isn
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                valueIsNotDefault.isn
              )}
            />
            <Input
              label="Fecha de alta"
              value={formData.requestDate}
              onChange={handleRequestDate}
              required
              error={getInputErrorException(
                requiredError.error,
                valueIsNotDefault.requestDate
              )}
              helperText={
                requiredError.helperText
                  ? getInputErrorException(
                      requiredError.helperText,
                      valueIsNotDefault.requestDate
                    )
                  : "Use formato dd/mm/yyyy"
              }
            />
          </RenderIf>
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
        unsavedData={unsavedInitialData}
        isEdition={isEdition}
        onSubmit={submitForm}
        onRenew={renewSummarySelected}
      />
    </FormContainer>
  );
};

export default memo(InitialDataForm);
