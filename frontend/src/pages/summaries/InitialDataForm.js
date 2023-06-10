import { useState, useEffect, useCallback } from "react";
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
  instructor_obj: { val: "", id: "default" },
  //type isSummary
  prosecution: "",
  prosecutor: "",
  prosecution_id: "",
  prosecution_obj: { val: "", id: "default" },
  court: "",
  judge: "",
  court_id: "",
  court_obj: { val: "", id: "default" },
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
        if (requiredValue === "" || requiredValue === "default") {
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
          if (requiredValue === "" || requiredValue === "default") {
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
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        initialData: false,
      }));
      closeFormMessage();
    }
  };

  //On successful submission
  const unsetUnsavedDataHandler = useCallback(
    () =>
      setUnsavedFormDataConditions((prevState) => ({
        ...prevState,
        initialData: false,
      })),
    [setUnsavedFormDataConditions]
  );

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
      instructor_obj: newValue.obj,
    }));
  };

  const handleProsecution = (newValue) => {
    setUnsavedDataHandler(newValue.val);
    setFormData((prevState) => ({
      ...prevState,
      prosecution: newValue.val,
      prosecution_id: newValue.id,
      prosecutor: newValue.adj,
      prosecution_obj: newValue.obj,
    }));
  };

  const handleCourt = (newValue) => {
    setUnsavedDataHandler(newValue.val);
    setFormData((prevState) => ({
      ...prevState,
      court: newValue.val,
      court_id: newValue.id,
      judge: newValue.adj,
      court_obj: newValue.obj,
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
        instructor_obj: {
          val: selectedSummary.instructor,
          id: selectedSummary.instructor_id,
          adj: selectedSummary.instructor_rank,
        },
      };

      const summaryValues = {
        prosecution: selectedSummary.prosecution,
        prosecutor: selectedSummary.prosecutor,
        prosecution_id: selectedSummary.prosecution_id,
        prosecution_obj: {
          val: selectedSummary.prosecution,
          id: selectedSummary.prosecution_id,
          adj: selectedSummary.prosecutor,
        },
        court: selectedSummary.court,
        judge: selectedSummary.judge,
        court_id: selectedSummary.court_id,
        court_obj: {
          val: selectedSummary.court,
          id: selectedSummary.court_id,
          adj: selectedSummary.judge,
        },
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
    <FormContainer className='column max900'>
      <FieldsContainer>
        <ResponsiveItem>
          <Select
            label='Tipo de actuación'
            value={formData.type}
            onChange={handleType}
            options={SUMMARY_TYPES}
            inputProps={{ disabled: isEdition }}
          />
          <Input
            label='Carátula'
            value={formData.cover}
            onChange={handleCover}
            required
            error={requiredError.error}
            helperText={requiredError.helperText}
          />
          <Input label='IPP' value={formData.ipp} onChange={handleIpp} />
          <Combobox
            label='Instructor'
            options={ps_data.instructors}
            onChange={handleInstructor}
            value={formData.instructor_obj}
            required
            error={requiredError.error}
            helperText={requiredError.helperText}
          />
        </ResponsiveItem>
        <ResponsiveItem>
          <RenderIf condition={formData.type === "isSummary"}>
            <Combobox
              label='Fiscalía'
              options={ps_data.prosecutions}
              onChange={handleProsecution}
              value={formData.prosecution_obj}
              required
              error={requiredError.error}
              helperText={requiredError.helperText}
            />
            <Combobox
              label='Juzg. Gtias.'
              options={ps_data.courts}
              onChange={handleCourt}
              value={formData.court_obj}
              required
              error={requiredError.error}
              helperText={requiredError.helperText}
            />
          </RenderIf>
          <RenderIf condition={formData.type !== "isSummary"}>
            <Input
              label='Órgano judicial interviniente'
              value={formData.judicialBody}
              onChange={handleJudicialBody}
              required
              error={requiredError.error}
              helperText={requiredError.helperText}
            />
            <Input
              label='ISN'
              value={formData.isn}
              onChange={handleIsn}
              required
              error={requiredError.error}
              helperText={requiredError.helperText}
            />
            <Input
              label='Fecha de alta'
              value={formData.requestDate}
              onChange={handleRequestDate}
              required
              error={requiredError.error}
              helperText={
                requiredError.helperText
                  ? requiredError.helperText
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

export default InitialDataForm;
