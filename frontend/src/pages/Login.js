import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "context/Context";
import { Select, Typography, Paper, MenuItem, Box } from "@mui/material";
import { Button } from "components/CommonStyles";
import { styled } from "@mui/material/styles";
import RenderIf from "components/RenderIf";
import Loading from "components/Loading";

const Login = () => {
  const context = useContext(Context);

  const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    justifyContent: "center",
  });

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: theme.shadows[2],
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  }));

  const [secretary, setSecretary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const requestSessionCookie = (user) =>
    axios
      .post(
        "/",
        { user: user },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log("respuesta POST /", response.data);
        navigate("/home");
      })
      .catch((error) => {
        setSubmitting(false);
        console.error(error);
      });

  const handleChange = (event) => setSecretary(event.target.value);

  const handleSubmit = () => {
    if (secretary !== "") {
      requestSessionCookie(secretary);
      setSubmitting(true);
    }
  };

  return (
    <Container>
      <StyledPaper>
        <RenderIf condition={context.ps_data_ready}>
          <Typography variant='h2'>Seleccione su usuario.</Typography>
          <StyledSelect
            value={secretary}
            onChange={handleChange}
            label='Secretario'
          >
            <MenuItem value={"Herrera Juan José_Ofl. Ayte."}>
              Herrera Juan José
            </MenuItem>
            <MenuItem value={"Alderete Vanesa_Ofl. Ayte."}>
              Alderete Vanesa
            </MenuItem>
            <MenuItem value={"Faisal Walter_Ofl. SubAyte."}>
              Faisal Walter
            </MenuItem>
          </StyledSelect>
          {submitting ? (
            <Typography variant='caption'>Cargando...</Typography>
          ) : (
            <Button onClick={handleSubmit}>Ingresar</Button>
          )}
        </RenderIf>
        <RenderIf condition={!context.ps_data_ready}>
          <Loading />
        </RenderIf>
      </StyledPaper>
    </Container>
  );
};

export default Login;
