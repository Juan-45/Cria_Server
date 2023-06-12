import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";
import RenderIf from "components/RenderIf";
import { verifyPropsReferences } from "helpers/development_debuggin";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  "& .MuiInputLabel-root.Mui-focused": {
    color: "inherit",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(0px, -1.5px) scale(0.75) !important",
    color: "inherit",
    "&.Mui-error": {
      color: `${theme.palette.error.main}`,
    },
  },
  "& .MuiInputLabel-root": {
    color: "inherit",
    transform: "translate(0px, 18px) scale(1)",
  },
  "& .MuiFormHelperText-root": {
    margin: "0px",
    marginTop: "3px",
  },
}));

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  "&.MuiInputBase-root": {
    "&::before": {
      zIndex: 1,
    },
    "&::after": {
      content: "unset",
    },
  },
  "& .MuiSelect-select": {
    padding: `${theme.spacing(0.5)} 0px ${theme.spacing(0.5)} ${theme.spacing(
      0
    )}`,
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.grey[900],
  },
}));

const Select = ({
  error,
  label,
  helperText,
  value,
  onChange,
  options,
  required,
  inputProps,
}) => {
  //Testing tool (pendiente)
  /*verifyPropsReferences(
    {
      error,
      label,
      helperText,
      value,
      onChange,
      options,
      required,
      inputProps,
    },
    "Select - props"
  );*/
  //
  return (
    <StyledFormControl fullWidth>
      <InputLabel id="select-label" error={error}>
        {label}
      </InputLabel>
      <StyledSelect
        error={error}
        value={value}
        onChange={onChange}
        required={required}
        inputProps={inputProps}
      >
        {options.map((option) => (
          <MenuItem key={option.val} value={option.val}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
      <RenderIf condition={error}>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </RenderIf>
    </StyledFormControl>
  );
};

export default Select;
