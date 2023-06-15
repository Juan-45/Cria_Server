import { useEffect } from "react";

const useUnsavedFormData = ({
  setUnsavedDataHandler,
  fieldsData,
  comparisonData,
}) => {
  useEffect(() => {
    const fieldsKeys = Object.keys(fieldsData);
    if (comparisonData) {
      const getUnsavedCondition = (comparisonData, fieldsKeys) => {
        let unsavedCondition = false;

        fieldsKeys.forEach((key) => {
          if (fieldsData[key] !== comparisonData[key]) {
            unsavedCondition = true;
          }
        });
        return unsavedCondition;
      };

      if (getUnsavedCondition(comparisonData, fieldsKeys)) {
        setUnsavedDataHandler(true);
      } else {
        setUnsavedDataHandler(false);
      }
    }
  }, [fieldsData, comparisonData, setUnsavedDataHandler]);
};

export default useUnsavedFormData;
