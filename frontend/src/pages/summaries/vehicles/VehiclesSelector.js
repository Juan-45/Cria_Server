import { memo } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import InteractiveList from "components/InteractiveList";
import { ResponsiveContainer, ResponsiveItem } from "components/CommonStyles";

const Container = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0px`,
  marginBottom: theme.spacing(4),
  width: "100%",
}));

const VehiclesSelector = ({
  vehicles,
  selectedItemId,
  selectItem,
  deleteItem,
}) => {
  return (
    <Container square>
      <ResponsiveContainer>
        <ResponsiveItem className='paddingInBetween'>
          <InteractiveList
            title='Secuestrados'
            list={vehicles.seized}
            selectedItemId={selectedItemId}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        </ResponsiveItem>
        <ResponsiveItem className='paddingInBetween'>
          <InteractiveList
            title='Sustraidos'
            list={vehicles.stolen}
            selectedItemId={selectedItemId}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        </ResponsiveItem>
      </ResponsiveContainer>
    </Container>
  );
};

export default memo(VehiclesSelector);
