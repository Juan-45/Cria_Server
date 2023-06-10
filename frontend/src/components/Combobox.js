import { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  "& .MuiInputLabel-root.Mui-focused": {},
  "& .MuiInputLabel-shrink": {
    color: "inherit !important",
    "&.Mui-error": {
      color: `${theme.palette.error.main} !important`,
    },
  },
  "& .MuiInput-input": {
    padding: `${theme.spacing(0.5)} 0px ${theme.spacing(0.5)} 0px`,
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: theme.palette.grey[900],
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: theme.palette.grey[900],
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiInputBase-root": {
    "&::before": {
      zIndex: 1,
    },
    "&::after": {
      content: "unset",
    },
  },
}));

const Combobox = ({
  onChange,
  value,
  label,
  error,
  helperText,
  required,
  name,
  options,
  ...props
}) => {
  const [oldValue, setOldValue] = useState({ val: "", id: "default" });

  const getComboBoxValue = (value) => {
    if (value) {
      return {
        val: value.val,
        id: value.id,
        adj: value.adj,
        obj: value,
      };
    } else {
      return {
        val: "",
        id: "default",
        adj: "",
        obj: { val: "", id: "default" },
      };
    }
  };

  const handleChange = (event, newValue) => {
    const transformedValue = getComboBoxValue(newValue);
    onChange(transformedValue);
  };

  return (
    <StyledAutoComplete
      value={value}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.val}
      //  autoSelect={true}
      openOnFocus={true}
      renderOption={(props, option) => {
        if (option.id !== "default") {
          return (
            <li {...props} key={option.id}>
              {option.val}
            </li>
          );
        }
      }}
      options={[...options, { val: "", id: "default" }]}
      {...props}
      renderInput={(params) => {
        const inputProps = params.inputProps;
        inputProps.autoComplete = "off";
        return (
          <TextField
            {...params}
            inputProps={inputProps}
            label={label}
            error={error}
            helperText={helperText}
            required={required}
            name={name}
          />
        );
      }}
    />
  );
};

export default Combobox;
