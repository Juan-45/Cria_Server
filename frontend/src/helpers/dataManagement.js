const sortData = (data, key) =>
  data.sort((a, b) => a[key].localeCompare(b[key]));

const manageDefaultStringForTable = (val) => {
  if (val === "" || val === undefined) {
    return "----";
  } else return val;
};

const manageDefaultStringForTemplates = (val) => {
  if (val === "" || val === undefined) {
    return "_________________";
  } else return val;
};

const manageDefaultStringForAccussed = (val) => {
  if (val === "" || val === undefined) {
    return "NN o varios";
  } else return val;
};

const removeItemFrom = (list, id) =>
  list.filter((item) => item.id !== id).map((item) => ({ ...item }));

const getPropertiesFrom = (obj, excludedProperties) => {
  const properties = Object.keys(obj).filter(
    (property) => !excludedProperties.includes(property)
  );
  return properties;
};

const getInvolvedsNames_by = (type, involveds) => {
  if (involveds) {
    const involvedsNamesArr = involveds
      .filter((involved) => involved.type === type)
      .map((involved) => involved.fullName);

    if (involvedsNamesArr.length > 1) {
      const involvedsNames = involvedsNamesArr.join(", ");
      return involvedsNames;
    } else {
      return involvedsNamesArr[0];
    }
  } else return manageDefaultStringForTable();
};

const getVehicleLabel = (vehicle) =>
  `${vehicle.type} ${vehicle.brand} ${vehicle.model} ${vehicle.color}`;

const getInvolvedDataStr = (involved) => {
  const educationLabel =
    involved.gender === "masculino" ? "instruido" : "instruida";

  const getEducation = (education) =>
    education === "sí" ? educationLabel : `no ${educationLabel}`;

  let involvedDataStr = `${involved.fullName.toUpperCase()}, edad ${
    involved.age
  } años, fecha de nacimiento ${involved.birthDate}, DNI Nro. ${
    involved.dni
  }, nacionalidad ${involved.nationality}, ${getEducation(
    involved.education
  )}, ${involved.civilStatus}, ${involved.occupation}, domicilio ${
    involved.address
  }, Te nro. ${involved.phone}; `;

  return involvedDataStr;
};

const getInvolvedsStrByType = (involveds, type) => {
  let involvedsDataStr = "";
  if (involveds) {
    involveds.forEach((involved) => {
      if (involved.type === type) {
        involvedsDataStr = involvedsDataStr + getInvolvedDataStr(involved);
      }
    });
  }
  return involvedsDataStr;
};

const getVehicleDataStr = (vehicle) => {
  const chassisLabel =
    vehicle.type === "vehículo automotor" ? "chasis" : "cuadro";

  const isBicycle = vehicle.type === "bicicleta";

  let vehicleDataStr = "";

  if (!isBicycle) {
    vehicleDataStr = `${vehicle.type.toUpperCase()}, marca ${
      vehicle.brand
    }, modelo ${vehicle.model}, color ${vehicle.color}, dominio ${
      vehicle.plate
    }, ${chassisLabel} nro. ${vehicle.vehicleFrameNro}, motor nro. ${
      vehicle.engineNro
    }; `;
  } else {
    vehicleDataStr = `${vehicle.type.toUpperCase()}, marca ${
      vehicle.brand
    }, modelo ${vehicle.model}, color ${vehicle.color}, ${chassisLabel} nro. ${
      vehicle.vehicleFrameNro
    }; `;
  }
  return vehicleDataStr;
};

const getVehiclesStrByStatus = (vehicles, status) => {
  let vehiclesDataStr = "";
  if (vehicles) {
    vehicles.forEach((vehicle) => {
      if (vehicle.status === status) {
        vehiclesDataStr = vehiclesDataStr + getVehicleDataStr(vehicle);
      }
    });
  }
  return vehiclesDataStr;
};

const isTimesstampOld = (timestamp, cycle_durationn) => {
  const currentTimestamp = Date.now();
  const timeDifference = currentTimestamp - timestamp;
  const timeDifferenceInHours = timeDifference / 1000 / 60 / 60;

  return timeDifferenceInHours > cycle_durationn ? true : false;
};

const getInvolvedTypeLabel = (type) => {
  if (type === "isVictim") return "Vícitma";
  if (type === "isComplainant") return "Denunciante";
  if (type === "isCausant") return "Causante";
  if (type === "isAccused") return "Imputado";
};

export {
  sortData,
  manageDefaultStringForTable,
  manageDefaultStringForTemplates,
  manageDefaultStringForAccussed,
  removeItemFrom,
  getPropertiesFrom,
  getInvolvedsNames_by,
  getVehicleLabel,
  getInvolvedDataStr,
  getInvolvedsStrByType,
  getVehicleDataStr,
  getVehiclesStrByStatus,
  isTimesstampOld,
  getInvolvedTypeLabel,
};
