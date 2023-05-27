import CloseIcon from "@mui/icons-material/Close";
import {
  FixedContainer,
  PopUp,
  PopUpHeader,
  Text,
  ButtonContainer,
  CloseButton,
} from "components/MessagePopUpStyles";
import { Button } from "components/CommonStyles";
import RenderIf from "components/RenderIf";

const WarningPopUp = ({
  open,
  setOpen,
  title,
  message,
  onAccept,
  onCancel,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <RenderIf condition={open}>
      <FixedContainer>
        <PopUp className="warning">
          <CloseButton onClick={handleClose} disableRipple={true}>
            <CloseIcon size="small" />
          </CloseButton>
          <PopUpHeader variant="h2" className="warning">
            {title}
          </PopUpHeader>
          <Text className="center">{message}</Text>
          <ButtonContainer>
            <Button onClick={onAccept}>Si</Button>
            <Button onClick={onCancel} className="leftSpace">
              No
            </Button>
          </ButtonContainer>
        </PopUp>
      </FixedContainer>
    </RenderIf>
  );
};

export default WarningPopUp;
