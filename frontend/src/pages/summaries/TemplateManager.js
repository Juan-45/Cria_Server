import { useMemo, memo, useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import { Button, ResponsiveItem } from "components/CommonStyles";
import { FormContainer } from "components/FormStyles";
import Select from "components/Select";
import WarningPopUp from "components/WarningPopUp";
import {
  getVehicleLabel,
  manageDefaultStringForTemplates,
  manageDefaultStringForAccussed,
  getInvolvedDataStr,
  getInvolvedsStrByType,
  getVehicleDataStr,
  getVehiclesStrByStatus,
  getInvolvedTypeLabel,
} from "helpers/dataManagement";

const Subtitle = styled(Typography)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
}));

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  paddingLeft: theme.spacing(2),
  flexWrap: "wrap",
  marginBottom: theme.spacing(2),
}));

const Ul = styled("ul")(({ theme }) => ({
  listStyleType: "circle",
  marginRight: theme.spacing(3),
}));

//TODO:
// - testear manejo de ls según timestamp en session o previous_session según corresponda y manejar reciclado de previous_session reiterado
// - manejar guardado de archivos y carga
// - investigar tema cache de bundles y su actualización
// - realizar prueba global de uso de app

const TemplateManager = ({ summarySelected, currentUser, getSummaryFiles }) => {
  const [involvedSelected, setInvolvedSelected] = useState(null);
  const [involvedId, setInvolvedId] = useState("");
  const [vehicleSelected, setVehicleSelected] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [associatedSelected, setAssociatedSelected] = useState(null);
  const [associateId, setAssociateId] = useState("");
  const [wrongFile_warningData, setWrongFile_warningData] = useState({
    warning: false,
    message: "",
    title: "",
  });

  const summarySelectedIdRef = useRef("");

  const involveds = summarySelected ? summarySelected.involveds : null;
  const vehicles = summarySelected ? summarySelected.vehicles : null;

  /*console.log("ESTADOS TemplateManager:", {
    involvedSelected,
    involvedId,
    vehicleSelected,
    vehicleId,
    associatedSelected,
    associateId,
  });*/

  const handleInvolvedSelection = (event) => {
    const matchedInvolved = involveds.find(
      (involved) => involved.id === event.target.value
    );
    setInvolvedId(event.target.value);
    setInvolvedSelected(matchedInvolved);
  };

  const changeAssociateSelection = (associateId) => {
    setAssociateId(associateId);
    if (associateId !== "unknown") {
      const matchedAssociated = involveds.find(
        (involved) => involved.id === associateId
      );
      setAssociatedSelected(matchedAssociated);
    } else setAssociatedSelected(null);
  };

  const handleVehicleSelection = (event) => {
    const matchedVehicle = vehicles.find(
      (vehicle) => vehicle.id === event.target.value
    );
    setVehicleId(event.target.value);
    setVehicleSelected(matchedVehicle);

    changeAssociateSelection(matchedVehicle.associatedTo);
  };

  const handleAssociatedSelection = (event) => {
    changeAssociateSelection(event.target.value);
  };

  const involvedsOptions = useMemo(() => {
    if (involveds) {
      return involveds.map((involved) => ({
        label: involved.fullName,
        val: involved.id,
      }));
    } else return [{ label: "", val: "" }];
  }, [involveds]);

  const vehiclesOptions = useMemo(() => {
    if (vehicles) {
      return vehicles.map((vehicle) => ({
        label: getVehicleLabel(vehicle),
        val: vehicle.id,
      }));
    } else return [{ label: "", val: "" }];
  }, [vehicles]);

  const associatesOptions = useMemo(() => {
    let options = [{ label: "Desconocido/a", val: "unknown" }];
    if (vehicleSelected && vehicleSelected.associatedTo !== "unknown") {
      const currentInvolved = involveds.find(
        (involved) => involved.id === vehicleSelected.associatedTo
      );
      options.push({
        label: currentInvolved.fullName,
        val: currentInvolved.id,
      });
    }
    return options;
  }, [involveds, vehicleSelected]);

  const getDateProperties = () => {
    return {
      currentDateStr: new Date().toLocaleDateString("es-AR"),
      day: new Date().getDate(),
      monthStr: new Date().toLocaleString("es-AR", { month: "long" }),
      year: new Date().getFullYear(),
    };
  };

  //Logic for managing data and rendering templates
  const generateBaseTemplates = async () => {
    const getValuesFrom = (summarySelected) => {
      const commonValues = {
        ...getDateProperties(),
        cover: summarySelected.cover,
        ipp: manageDefaultStringForTemplates(summarySelected.ipp),
        instructor: summarySelected.instructor,
        instructorRank: summarySelected.instructor_rank,
        secretary: currentUser.val,
        secretaryRank: currentUser.adj,
        victims: manageDefaultStringForTemplates(summarySelected.victims),
        complainants: manageDefaultStringForTemplates(
          summarySelected.complainants
        ),
        causants: manageDefaultStringForTemplates(summarySelected.causants),
        accuseds: manageDefaultStringForAccussed(summarySelected.accuseds),
        victimsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isVictim"
        ),
        complainantsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isComplainant"
        ),
        causantsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isCausant"
        ),
        accusedsDataStr: manageDefaultStringForAccussed(
          getInvolvedsStrByType(summarySelected.involveds, "isAccused")
        ),
        vehiclesStolenDataStr: getVehiclesStrByStatus(
          summarySelected.vehicles,
          "isStolen"
        ),
        vehiclesSeizedDataStr: getVehiclesStrByStatus(
          summarySelected.vehicles,
          "isSeized"
        ),
      };

      const summaryValues = {
        prosecution: summarySelected.prosecution,
        prosecutor: summarySelected.prosecutor,
        court: summarySelected.court,
        judge: summarySelected.judge,
      };

      const nonSummaryValues = {
        judicialBody: summarySelected.judicialBody,
        isn: summarySelected.isn,
        requestDate: summarySelected.requestDate,
      };

      if (summarySelected.type === "isSummary") {
        return { ...commonValues, ...summaryValues };
      } else {
        return { ...commonValues, ...nonSummaryValues };
      }
    };

    await getSummaryFiles({
      setWarningData: setWrongFile_warningData,
      summaryFolderName: summarySelected.summary_by,
      data: getValuesFrom(summarySelected),
      folder_reference: "base_files",
    });
  };

  const generateInvolvedTemplates = async () => {
    const getValuesFrom = (involvedSelected, summarySelected) => {
      const commonValues = {
        ...getDateProperties(),
        type: getInvolvedTypeLabel(involvedSelected.type),
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
        //summary data
        cover: summarySelected.cover,
        ipp: manageDefaultStringForTemplates(summarySelected.ipp),
        instructor: summarySelected.instructor,
        instructorRank: summarySelected.instructor_rank,
        secretary: currentUser.val,
        secretaryRank: currentUser.adj,
        victims: manageDefaultStringForTemplates(summarySelected.victims),
        complainants: manageDefaultStringForTemplates(
          summarySelected.complainants
        ),
        causants: manageDefaultStringForTemplates(summarySelected.causants),
        accuseds: manageDefaultStringForAccussed(summarySelected.accuseds),
        prosecution: manageDefaultStringForTemplates(
          summarySelected.prosecution
        ),
        prosecutor: manageDefaultStringForTemplates(summarySelected.prosecutor),
        court: manageDefaultStringForTemplates(summarySelected.court),
        judicialBody: summarySelected.judicialBody,
        isn: summarySelected.isn,
        requestDate: summarySelected.requestDate,
      };

      const detaineeFileValues = {
        city: involvedSelected.city,
        province: involvedSelected.province,
        detaineeStatus: involvedSelected.detaineeStatus,
        nickName: involvedSelected.nickName,
        fatherFullName: involvedSelected.fatherFullName,
        motherFullName: involvedSelected.motherFullName,
        arrestDate: involvedSelected.arrestDate,
        arrestAddress: involvedSelected.arrestAddress,
        felonyDate: involvedSelected.felonyDate,
        felonyAddress: involvedSelected.felonyAddress,
        //physical features
        aspect: involvedSelected.aspect,
        bodyBuild: involvedSelected.bodyBuild,
        height: involvedSelected.height,
        physicalDefects: involvedSelected.physicalDefects,
        skindColor: involvedSelected.skindColor,
        hairColor: involvedSelected.hairColor,
        beardColor: involvedSelected.beardColor,
        beardPeculiarity: involvedSelected.beardPeculiarity,
        forehead: involvedSelected.forehead,
        foreheadPeculiarity: involvedSelected.foreheadPeculiarity,
        eyelids: involvedSelected.eyelids,
        eyelidsPeculiarity: involvedSelected.eyelidsPeculiarity,
        irisColor: involvedSelected.irisColor,
        irisPeculiarity: involvedSelected.irisPeculiarity,
        noseProfile: involvedSelected.noseProfile,
        noseBase: involvedSelected.noseBase,
        nosePeculiarity: involvedSelected.nosePeculiarity,
        mouthSize: involvedSelected.mouthSize,
        mouthForm: involvedSelected.mouthForm,
        mouthPeculiarity: involvedSelected.mouthPeculiarity,
        lips: involvedSelected.lips,
        chin: involvedSelected.chin,
        lips_chinPeculiarity: involvedSelected.lips_chinPeculiarity,
        ears: involvedSelected.ears,
        earsPeculiarity: involvedSelected.earsPeculiarity,
        //distinctive marks and scars
        physicalPeculiarity: involvedSelected.physicalPeculiarity,
        headAndNeckPeculiarity: involvedSelected.headAndNeckPeculiarity,
        rightHandPeculiarity: involvedSelected.rightHandPeculiarity,
        leftHandPeculiarity: involvedSelected.leftHandPeculiarity,
        rightLegPeculiarity: involvedSelected.rightLegPeculiarity,
        leftLegPeculiarity: involvedSelected.leftLegPeculiarity,
      };

      if (involvedSelected.isDetaineeFileNecessary === "true") {
        return { ...commonValues, ...detaineeFileValues };
      } else if (
        involvedSelected.type === "isAccused" ||
        involvedSelected.type === "isCausant"
      ) {
        return commonValues;
      } else {
        return commonValues;
      }
    };

    await getSummaryFiles({
      setWarningData: setWrongFile_warningData,
      summaryFolderName: summarySelected.summary_by,
      optional_inner_subFolder: involvedSelected.fullName,
      data: getValuesFrom(involvedSelected, summarySelected),
      folder_reference: "involveds_files",
    });
  };

  const generateVehicleTemplates = async () => {
    const getValuesFrom = (
      vehicleSelected,
      summarySelected,
      associatedSelected
    ) => {
      const notAssociatedStr = `______________________________, edad ____ años, fecha de nacimiento ___/___/______, DNI Nro. _____________________, nacionalidad ________________, ____ instruido, estado civil _______________, ocupación ________________, domicilio ________________________________, Te nro. ________________; `;

      const commonValues = {
        //common vehicle data
        brand: vehicleSelected.brand,
        model: vehicleSelected.model,
        color: vehicleSelected.color,
        vehicleFrameNro: vehicleSelected.vehicleFrameNro,
        vehicleDataStr: getVehicleDataStr(vehicleSelected),
        associatedDataStr: associatedSelected
          ? getInvolvedDataStr(associatedSelected)
          : notAssociatedStr,
        //summary data
        ...getDateProperties(),
        cover: summarySelected.cover,
        ipp: manageDefaultStringForTemplates(summarySelected.ipp),
        instructor: summarySelected.instructor,
        instructorRank: summarySelected.instructor_rank,
        secretary: currentUser.val,
        secretaryRank: currentUser.adj,
        victims: manageDefaultStringForTemplates(summarySelected.victims),
        complainants: manageDefaultStringForTemplates(
          summarySelected.complainants
        ),
        causants: manageDefaultStringForTemplates(summarySelected.causants),
        accuseds: manageDefaultStringForAccussed(summarySelected.accuseds),
        prosecution: manageDefaultStringForTemplates(
          summarySelected.prosecution
        ),
        prosecutor: manageDefaultStringForTemplates(summarySelected.prosecutor),
        victimsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isVictim"
        ),
        complainantsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isComplainant"
        ),
        causantsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isCausant"
        ),
        accusedsDataStr: getInvolvedsStrByType(
          summarySelected.involveds,
          "isAccused"
        ),
      };

      const notBicycleValues = {
        type: vehicleSelected.type,
        engineNro: vehicleSelected.engineNro,
        plate: vehicleSelected.plate,
      };

      if (vehicleSelected.type === "bicicleta") {
        return commonValues;
      } else {
        return { ...commonValues, ...notBicycleValues };
      }
    };

    await getSummaryFiles({
      setWarningData: setWrongFile_warningData,
      summaryFolderName: summarySelected.summary_by,
      optional_inner_subFolder: getVehicleLabel(vehicleSelected),
      data: getValuesFrom(vehicleSelected, summarySelected, associatedSelected),
      folder_reference: "vehicles_files",
    });
  };

  //In case of summarySelected change, reset the involveds and vehicles selectors
  //In case of summarySelected deletion, this component unmounts
  useEffect(() => {
    if (summarySelected) {
      if (summarySelectedIdRef.current !== summarySelected.version_id) {
        setInvolvedId("");
        setVehicleId("");
        setAssociateId("");
        setInvolvedSelected(null);
        setVehicleSelected(null);
        setAssociatedSelected(null);
        summarySelectedIdRef.current = summarySelected.version_id;
      }
    }
  }, [summarySelected]);
  return (
    <>
      <WarningPopUp
        open={wrongFile_warningData.warning}
        withOptions={false}
        setOpen={(val) =>
          setWrongFile_warningData((prevState) => ({
            ...prevState,
            warning: val,
          }))
        }
        title={wrongFile_warningData.title}
        message={wrongFile_warningData.message}
      />
      <FormContainer className="max900 column">
        <Typography variant="h2" gutterBottom>
          Plantillas de base
        </Typography>
        <FlexContainer>
          <Subtitle variant="subtitle1" gutterBottom>
            Utilizar este selector para cargar datos en plantillas de base:
          </Subtitle>
          <Ul>
            <li>Carátulas</li>
            <li>Notas de elevación</li>
            <li>Parte preventivo</li>
          </Ul>
          <Ul>
            <li>Memorandum</li>
            <li>Nota de elevación de actuaciones complementarias</li>
            <li>Decreto de elevación</li>
          </Ul>
        </FlexContainer>
        <Button onClick={generateBaseTemplates}>Abrir selector</Button>
      </FormContainer>
      <FormContainer className="max900 column">
        <Typography variant="h2" gutterBottom>
          Plantillas de involucrados
        </Typography>
        <FlexContainer className="extraMarginBottom">
          <Subtitle variant="subtitle1" gutterBottom>
            {involveds
              ? "Para cargar los datos que corresponden, primero seleccione un involucrado:"
              : "No hay involucrados para seleccionar"}
          </Subtitle>
          <ResponsiveItem>
            <Select
              label="Involucrados"
              value={involvedId}
              onChange={handleInvolvedSelection}
              options={involvedsOptions}
              inputProps={{ disabled: !involveds }}
            />
          </ResponsiveItem>
        </FlexContainer>
        <Button
          disabled={involvedId === ""}
          onClick={generateInvolvedTemplates}
        >
          Abrir selector
        </Button>
      </FormContainer>
      <FormContainer className="max900 column">
        <Typography variant="h2" gutterBottom>
          Plantillas de vehículos
        </Typography>
        <FlexContainer>
          <Subtitle variant="subtitle1" gutterBottom>
            {vehicles
              ? "Seleccione un vehículo y si correspone el involucrado asociado:"
              : "No hay vehículos para seleccionar"}
          </Subtitle>
          <ResponsiveItem>
            <Select
              label="Vehículos"
              value={vehicleId}
              onChange={handleVehicleSelection}
              options={vehiclesOptions}
              inputProps={{ disabled: !vehicles }}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Select
              label="Asociado a"
              value={associateId}
              onChange={handleAssociatedSelection}
              options={associatesOptions}
              inputProps={{ disabled: !vehicles }}
            />
          </ResponsiveItem>
        </FlexContainer>
        <Button disabled={vehicleId === ""} onClick={generateVehicleTemplates}>
          Abrir selector
        </Button>
      </FormContainer>
    </>
  );
};

export default memo(TemplateManager);
