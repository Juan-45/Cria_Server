const getInputErrorException = (error, errorConditionException = false) => {
  if (typeof error === "boolean") {
    return errorConditionException ? false : error;
  } else if (typeof error === "string") {
    return errorConditionException ? "" : error;
  }
};

const getValueIsNotDefinedCondition = (value) => {
  const condition = value !== "" && true;
  return condition;
};

export { getInputErrorException, getValueIsNotDefinedCondition };
