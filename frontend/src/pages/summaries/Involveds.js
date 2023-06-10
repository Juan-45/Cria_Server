import { useMemo } from "react";
import { Typography } from "@mui/material";
import InvolvedsSelector from "pages/summaries/involveds/InvolvedsSelector";
import InvolvedForm from "pages/summaries/involveds/InvolvedForm";

const Involveds = ({ involveds }) => {
  const involvedsTransformed = useMemo(() => {
    if (involveds) {
      let involvedsTransformed = {
        victims: [],
        complainants: [],
        causants: [],
        accuseds: [],
      };

      involveds.forEach((involved) => {
        if (involved.type === "isVictim") {
          involvedsTransformed.victims.push({
            label: involved.fullName,
            id: involved.id,
          });
        } else if (involved.type === "isComplainant") {
          involvedsTransformed.complainants.push({
            label: involved.fullName,
            id: involved.id,
          });
        } else if (involved.type === "isCausant") {
          involvedsTransformed.causants.push({
            label: involved.fullName,
            id: involved.id,
          });
        } else {
          involvedsTransformed.accuseds.push({
            label: involved.fullName,
            id: involved.id,
          });
        }
      });

      return involvedsTransformed;
    } else
      return {
        victims: null,
        complainants: null,
        causants: null,
        accuseds: null,
      };
  }, [involveds]);

  return (
    <>
      <Typography variant='h2' gutterBottom>
        Datos de involucrados
      </Typography>
      <InvolvedsSelector
        involveds={involvedsTransformed}
        /* selectedItemId=''
      selectItem={selectItem}
      deleteItem={deleteItem}*/
      />
      <Typography variant='h2' gutterBottom>
        Circunstancias personales
      </Typography>
      <InvolvedForm />
    </>
  );
};

export default Involveds;
