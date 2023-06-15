import { memo } from "react";
import {
  getInputErrorException,
  getValueIsNotDefinedCondition,
} from "helpers/error";
import { Typography } from "@mui/material";
import { FieldsContainer } from "components/FormStyles";
import { ResponsiveItem, ResponsiveContainer } from "components/CommonStyles";
import Input from "components/Input";

const PhysicalFeatures = ({ formData, setFormData, requiredError }) => {
  const handleAspect = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      aspect: value,
    }));
  };

  const handleBodyBuild = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      bodyBuild: value,
    }));
  };

  const handleHeight = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      height: value,
    }));
  };

  const handlePhysicalDefects = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      physicalDefects: value,
    }));
  };

  const handleSkindColor = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      skindColor: value,
    }));
  };

  const handleHairColor = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      hairColor: value,
    }));
  };

  const handleBeardColor = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      beardColor: value,
    }));
  };

  const handleBeardPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      beardPeculiarity: value,
    }));
  };

  const handleForehead = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      forehead: value,
    }));
  };

  const handleForeheadPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      foreheadPeculiarity: value,
    }));
  };

  const handleEyelids = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      eyelids: value,
    }));
  };

  const handleEyelidsPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      eyelidsPeculiarity: value,
    }));
  };

  const handleIrisColor = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      irisColor: value,
    }));
  };

  const handleIrisPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      irisPeculiarity: value,
    }));
  };

  const handleNoseProfile = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      noseProfile: value,
    }));
  };

  const handleNoseBase = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      noseBase: value,
    }));
  };

  const handleNosePeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      nosePeculiarity: value,
    }));
  };

  const handleMouthSize = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      mouthSize: value,
    }));
  };

  const handleMouthForm = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      mouthForm: value,
    }));
  };

  const handleMouthPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      mouthPeculiarity: value,
    }));
  };

  const handleLips = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      lips: value,
    }));
  };

  const handleChin = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      chin: value,
    }));
  };

  const handleLips_chinPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      lips_chinPeculiarity: value,
    }));
  };

  const handleEars = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      ears: value,
    }));
  };

  const handleEarsPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,

      earsPeculiarity: value,
    }));
  };

  const handlePhysicalPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      physicalPeculiarity: value,
    }));
  };

  const handleHeadAndNeckPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      headAndNeckPeculiarity: value,
    }));
  };

  const handleRightHandPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      rightHandPeculiarity: value,
    }));
  };

  const handleLeftHandPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      leftHandPeculiarity: value,
    }));
  };

  const handleRightLegPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,

      rightLegPeculiarity: value,
    }));
  };

  const handleLeftLegPeculiarity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      leftLegPeculiarity: value,
    }));
  };

  return (
    <FieldsContainer>
      <ResponsiveItem className='max-3-columns'>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Aspecto'
              value={formData.aspect}
              onChange={handleAspect}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.aspect)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.aspect)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Contextura'
              value={formData.bodyBuild}
              onChange={handleBodyBuild}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.bodyBuild)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.bodyBuild)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Altura'
              value={formData.height}
              onChange={handleHeight}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.height)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.height)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Defectos físicos'
              value={formData.physicalDefects}
              onChange={handlePhysicalDefects}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.physicalDefects)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.physicalDefects)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Color de piel'
              value={formData.skindColor}
              onChange={handleSkindColor}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.skindColor)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.skindColor)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Cabello'
              value={formData.hairColor}
              onChange={handleHairColor}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.hairColor)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.hairColor)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Barba'
              value={formData.beardColor}
              onChange={handleBeardColor}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.beardColor)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.beardColor)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.beardPeculiarity}
              onChange={handleBeardPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.beardPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.beardPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Frente'
              value={formData.forehead}
              onChange={handleForehead}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.forehead)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.forehead)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.foreheadPeculiarity}
              onChange={handleForeheadPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.foreheadPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.foreheadPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Párpados'
              value={formData.eyelids}
              onChange={handleEyelids}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.eyelids)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.eyelids)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.eyelidsPeculiarity}
              onChange={handleEyelidsPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.eyelidsPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.eyelidsPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Iris'
              value={formData.irisColor}
              onChange={handleIrisColor}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.irisColor)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.irisColor)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.irisPeculiarity}
              onChange={handleIrisPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.irisPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.irisPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
      </ResponsiveItem>
      <ResponsiveItem className='max-3-columns'>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Orejas'
              value={formData.ears}
              onChange={handleEars}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.ears)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.ears)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.earsPeculiarity}
              onChange={handleEarsPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.earsPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.earsPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Perfil de nariz'
              value={formData.noseProfile}
              onChange={handleNoseProfile}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.noseProfile)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.noseProfile)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Base'
              value={formData.noseBase}
              onChange={handleNoseBase}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.noseBase)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.noseBase)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.nosePeculiarity}
              onChange={handleNosePeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.nosePeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.nosePeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Tamaño de boca'
              value={formData.mouthSize}
              onChange={handleMouthSize}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.mouthSize)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.mouthSize)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Forma'
              value={formData.mouthForm}
              onChange={handleMouthForm}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.mouthForm)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.mouthForm)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.mouthPeculiarity}
              onChange={handleMouthPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.mouthPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.mouthPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Labios'
              value={formData.lips}
              onChange={handleLips}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.lips)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.lips)
              )}
            />
          </ResponsiveItem>
          <ResponsiveItem>
            <Input
              label='Mentón'
              value={formData.chin}
              onChange={handleChin}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.chin)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.chin)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
        <ResponsiveContainer className='paddingInBetween'>
          <ResponsiveItem>
            <Input
              label='Particularidades'
              value={formData.lips_chinPeculiarity}
              onChange={handleLips_chinPeculiarity}
              required
              error={getInputErrorException(
                requiredError.error,
                getValueIsNotDefinedCondition(formData.lips_chinPeculiarity)
              )}
              helperText={getInputErrorException(
                requiredError.helperText,
                getValueIsNotDefinedCondition(formData.lips_chinPeculiarity)
              )}
            />
          </ResponsiveItem>
        </ResponsiveContainer>
      </ResponsiveItem>
      <ResponsiveItem className='max-3-columns'>
        <Typography variant='subtitle1' gutterBottom align='center'>
          Señas particulares y cicatrices
        </Typography>
        <Input
          label='Varios'
          value={formData.physicalPeculiarity}
          onChange={handlePhysicalPeculiarity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.physicalPeculiarity)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.physicalPeculiarity)
          )}
        />
        <Input
          label='Cabeza y cuello'
          value={formData.headAndNeckPeculiarity}
          onChange={handleHeadAndNeckPeculiarity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.headAndNeckPeculiarity)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.headAndNeckPeculiarity)
          )}
        />
        <Input
          label='Mano derecha'
          value={formData.rightHandPeculiarity}
          onChange={handleRightHandPeculiarity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.rightHandPeculiarity)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.rightHandPeculiarity)
          )}
        />
        <Input
          label='Mano izquierda'
          value={formData.leftHandPeculiarity}
          onChange={handleLeftHandPeculiarity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.leftHandPeculiarity)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.leftHandPeculiarity)
          )}
        />
        <Input
          label='Pierna derecha'
          value={formData.rightLegPeculiarity}
          onChange={handleRightLegPeculiarity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.rightLegPeculiarity)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.rightLegPeculiarity)
          )}
        />
        <Input
          label='Pierna izquierda'
          value={formData.leftLegPeculiarity}
          onChange={handleLeftLegPeculiarity}
          required
          error={getInputErrorException(
            requiredError.error,
            getValueIsNotDefinedCondition(formData.leftLegPeculiarity)
          )}
          helperText={getInputErrorException(
            requiredError.helperText,
            getValueIsNotDefinedCondition(formData.leftLegPeculiarity)
          )}
        />
      </ResponsiveItem>
    </FieldsContainer>
  );
};

export default memo(PhysicalFeatures);
