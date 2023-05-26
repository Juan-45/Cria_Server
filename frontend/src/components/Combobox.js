import { TextField, Autocomplete } from "@mui/material";

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
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.val}
      //  autoSelect={true}
      openOnFocus={true}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.val}
          </li>
        );
      }}
      options={options}
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
