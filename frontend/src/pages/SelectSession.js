import { useNavigate } from "react-router-dom";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  MediumContainer,
  Button,
  FullscreenColumn,
} from "components/CommonStyles";
import { clean_currentSession, recycleDataSession } from "helpers/localStorage";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "start",
  flexWrap: "wrap",
  boxShadow: theme.shadows[2],
  "&.bottomSpace": {
    marginBottom: theme.spacing(3),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "100%",
  color: theme.palette.info.main,
  "&.center": {
    textAlign: "center",
  },
  "&.primary": {
    color: "initial",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const HOME_PATH = "/summaries";

const SelectSession = ({ currentUser }) => {
  const navigate = useNavigate();

  const initNewSession = () => {
    clean_currentSession(currentUser.id);
    navigate(HOME_PATH);
  };

  const continuePreviousSession = () => {
    recycleDataSession(currentUser.id);
    navigate(HOME_PATH);
  };

  return (
    <FullscreenColumn>
      <MediumContainer>
        <Title variant='h2' className='center primary'>
          {`Bienvenido/a ${currentUser.adj} ${currentUser.val}`}
        </Title>
        <StyledPaper className='bottomSpace'>
          <Title variant='h2'>Nueva sesión.</Title>
          <Text>
            No necesita recuperar los datos de sumarios o inspecciones de
            calabozos y conteos de detenidos de la sesión previa, comenzará
            desde cero y los datos previos se borraran de la aplicación.
          </Text>
          <Button onClick={initNewSession}>Seleccionar</Button>
        </StyledPaper>

        <StyledPaper className='bottomSpace'>
          <Title variant='h2'>Sesión previa.</Title>
          <Text>
            Necesita continuar trabajando con los datos de la sesión más
            reciente.
          </Text>
          <Button onClick={continuePreviousSession}>Seleccionar</Button>
        </StyledPaper>
      </MediumContainer>
    </FullscreenColumn>
  );
};

export default SelectSession;
