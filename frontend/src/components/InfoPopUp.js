import {
  FixedContainer,
  PopUp,
  PopUpHeader,
  Text,
  ButtonContainer,
} from "components/MessagePopUpStyles";
import { Button } from "components/CommonStyles";
import RenderIf from "components/RenderIf";

const InfoPopUp = ({ open, setOpen, title, message }) => {
  const handleCancel = () => setOpen(false);
  return (
    <RenderIf condition={open}>
      <FixedContainer>
        <PopUp className='info'>
          <PopUpHeader variant='h2' className='info'>
            {title}
          </PopUpHeader>
          <Text className='center'>{message}</Text>
          <ButtonContainer>
            <Button onClick={handleCancel}>Cerrar</Button>
          </ButtonContainer>
        </PopUp>
      </FixedContainer>
    </RenderIf>
  );
};

export default InfoPopUp;
