import { useState, useEffect } from "react";
import proptypes from "prop-types";
import {
  FixedContainer,
  PopUp,
  PopUpHeader,
  Text,
  ButtonContainer,
} from "components/MessagePopUpStyles";
import { Button } from "components/CommonStyles";
import RenderIf from "components/RenderIf";

const ErrorPopUp = ({
  errorCondition,
  errorData,
  isRequestType,
  shouldResetSite,
}) => {
  const [error, setError] = useState(false);

  const closePopUp = () => setError(false);

  const popUpHeader = shouldResetSite
    ? "Ha ocurrido un error y debe resetear el sitio. Presione la tecla f5."
    : "Ha ocurrido un error.";
  useEffect(() => {
    if (errorCondition) {
      setError(true);
    }
  }, [errorCondition]);
  return (
    <RenderIf condition={error}>
      <FixedContainer>
        <PopUp>
          <PopUpHeader variant='h2'>{popUpHeader}</PopUpHeader>
          <Text variant='subtitle1'>{errorData.title}</Text>
          <Text>{errorData.message}</Text>
          <RenderIf condition={isRequestType}>
            <Text>{`Estado: ${errorData.status}`}</Text>
            <Text>{`Código: ${errorData.code}`}</Text>
            <Text>{`URL: ${errorData.url}`}</Text>
          </RenderIf>
          <RenderIf condition={!shouldResetSite}>
            <ButtonContainer>
              <Button onClick={closePopUp}>Cerrar</Button>
            </ButtonContainer>
          </RenderIf>
        </PopUp>
      </FixedContainer>
    </RenderIf>
  );
};

ErrorPopUp.defaultProps = {
  errorCondition: false,
  isRequestType: false,
  shouldResetSite: false,
  errorData: {
    title: "_",
    status: "_",
    code: "_",
    message: "_",
    url: "_",
  },
};

ErrorPopUp.proptypes = {
  error: proptypes.bool.isRequired,
  isRequestType: proptypes.bool.isRequired,
  shouldResetSite: proptypes.bool.isRequired,
  errorData: proptypes.shape({
    title: proptypes.string,
    status: proptypes.string,
    code: proptypes.string,
    message: proptypes.string,
    url: proptypes.string,
  }).isRequired,
};

export default ErrorPopUp;
