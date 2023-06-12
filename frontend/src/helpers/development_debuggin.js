import { useRef, useEffect } from "react";

const verifyPropsReferences = (props, componentName) => {
  const prevPropsRef = useRef(props);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    const propNames = Object.keys(props);
    const changedProps = {};

    propNames.forEach((propName) => {
      if (props[propName] !== prevProps[propName]) {
        changedProps[propName] = {
          prevValue: prevProps[propName],
          newValue: props[propName],
        };
      }
    });

    if (Object.keys(changedProps).length > 0) {
      console.log(`/_Testing: ${componentName}_/`);
      console.log("/_Han cambiado_/:", {
        changedProps,
      });
    }

    prevPropsRef.current = props;
  }, [...Object.values(props), props]);
};

export { verifyPropsReferences };
