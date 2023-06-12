import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import {
  GenericContainer,
  ResponsiveContainer,
  Button,
} from "components/CommonStyles";
import RenderIf from "components/RenderIf";

const FormContainer = styled(GenericContainer)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  padding: `${theme.spacing(2)} 0px`,
  marginBottom: theme.spacing(4),
  border: `2px solid ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.secondary.ligth,
}));

const FieldsContainer = styled(ResponsiveContainer)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiButtonBase-root": {
    "&:hover": {
      backgroundColor: "#ffffffc9",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.3rem",
  },
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: `0px ${theme.spacing(2)}`,
  paddingTop: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FormMessage = ({ severity, open, onClose, children }) => {
  return (
    <Collapse in={open}>
      <StyledAlert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {children}
      </StyledAlert>
    </Collapse>
  );
};

const FormSettings = ({ isEdition, unsavedData, onSubmit, onRenew }) => {
  return (
    <ButtonsContainer>
      <Button onClick={onSubmit} disabled={!unsavedData}>
        {isEdition ? "Modificar" : "Agregar"}
      </Button>
      <RenderIf condition={isEdition}>
        <Button onClick={onRenew} disabled={unsavedData}>
          Agregar otro
        </Button>
      </RenderIf>
    </ButtonsContainer>
  );
};

export { FormContainer, FieldsContainer, FormMessage, FormSettings };
