import { useState, useEffect } from "react";

const useCombobox = ({ onChange, shouldReset, options, valueId }) => {
  const [value, setValue] = useState(null);

  const comboBoxHandler = (event, newValue) => {
    const localValueToUpdate = newValue ? newValue.label : "";
    const formValueToUpdate = newValue ? newValue.id : "";
    setValue(localValueToUpdate);
    onChange(formValueToUpdate);
  };

  useEffect(() => {
    if (shouldReset) {
      setValue(null);
    }
  }, [shouldReset]);
  useEffect(() => {
    if (valueId) {
      const newLocalValue = options.find((obj) => obj.id === valueId).label;
      const newFormValue = options.find((obj) => obj.id === valueId).id;
      setValue(newLocalValue);
      onChange(newFormValue);
    }
  }, [valueId]);
  return {
    comboBoxHandler,
    value,
  };
};

export default useCombobox;
