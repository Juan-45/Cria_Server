import CloseIcon from "@mui/icons-material/Close";
import {
  FixedContainer,
  PopUp,
  PopUpHeader,
  Text,
  CloseButton,
} from "components/MessagePopUpStyles";
import RenderIf from "components/RenderIf";

const InfoPopUp = ({ open, setOpen, title, message }) => {
  const handleClose = () => setOpen(false);
  return (
    <RenderIf condition={open}>
      <FixedContainer>
        <PopUp className="info">
          <CloseButton onClick={handleClose} disableRipple={true}>
            <CloseIcon size="small" />
          </CloseButton>
          <PopUpHeader variant="h2" className="info">
            {title}
          </PopUpHeader>
          <Text className="center">{message}</Text>
        </PopUp>
      </FixedContainer>
    </RenderIf>
  );
};

export default InfoPopUp;
