import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TextField as TextFieldOriginal } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextField = styled(TextFieldOriginal)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  "& .MuiInputBase-root": {
    "&::after": {
      content: "unset",
    },
  },
  "& .MuiInputLabel-shrink": {
    color: "inherit !important",
    "&.Mui-error": {
      color: `${theme.palette.error.main} !important`,
    },
  },
}));

const Input = ({ value, onChange, ...otherProps }) => {
  const [internalValue, setInternalValue] = useState(value);
  const debouncedOnChange = useDebouncedCallback(onChange, 250, {
    leading: true,
  });

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    debouncedOnChange(newValue);
  };
  return (
    <TextField value={internalValue} onChange={handleChange} {...otherProps} />
  );
};

export default Input;
