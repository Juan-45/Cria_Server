import { useState, useEffect } from "react";
import {
  FixedContainer,
  PopUp,
  PopUpHeader,
  Text,
  ButtonContainer,
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
  acceptText,
  cancelText,
}) => {
  const handleCancel = () => setOpen(false);
  //agregar boton cruz para cerrar ventana de mensaje, independientemente del tipo de mensaje
  return (
    <RenderIf condition={open}>
      <FixedContainer>
        <PopUp className='warning'>
          <PopUpHeader variant='h2' className='warning'>
            {title}
          </PopUpHeader>
          <Text className='center'>{message}</Text>
          <ButtonContainer>
            <Button onClick={onAccept}>{acceptText}</Button>
            <Button onClick={onCancel} className='leftSpace'>
              {cancelText}
            </Button>
          </ButtonContainer>
        </PopUp>
      </FixedContainer>
    </RenderIf>
  );
};

export default WarningPopUp;
