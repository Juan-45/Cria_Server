import { Checkbox as CheckboxOriginal, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCheckbox = styled(CheckboxOriginal)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
}));

const Checkbox = ({ onChange, value, label = "", disabled }) => {
  const handleChange = (event) => {
    const transformedValue = event.target.checked ? "true" : "false";
    onChange(transformedValue);
  };

  return (
    <FormControlLabel
      label={label}
      control={
        <StyledCheckbox
          checked={value === "true" ? true : false}
          disabled={disabled}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};

export default Checkbox;
