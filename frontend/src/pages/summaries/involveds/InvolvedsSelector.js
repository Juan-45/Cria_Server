import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import InteractiveList from "components/InteractiveList";
import { ResponsiveContainer, ResponsiveItem } from "components/CommonStyles";

const Container = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0px`,
  marginBottom: theme.spacing(4),
  width: "100%",
}));

const InvolvedsSelector = ({
  involveds,
  selectedItemId,
  selectItem,
  deleteItem,
}) => {
  return (
    <Container square>
      <ResponsiveContainer>
        <ResponsiveItem className='max-4-columns'>
          <InteractiveList
            title='Víctimas'
            list={involveds.victims}
            selectedItemId={selectedItemId}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        </ResponsiveItem>
        <ResponsiveItem className='max-4-columns'>
          <InteractiveList
            title='Denunciantes'
            list={involveds.complainants}
            selectedItemId={selectedItemId}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        </ResponsiveItem>
        <ResponsiveItem className='max-4-columns'>
          <InteractiveList
            title='Causantes'
            list={involveds.causants}
            selectedItemId={selectedItemId}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        </ResponsiveItem>
        <ResponsiveItem className='max-4-columns'>
          <InteractiveList
            title='Imputados'
            list={involveds.accuseds}
            selectedItemId={selectedItemId}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        </ResponsiveItem>
      </ResponsiveContainer>
    </Container>
  );
};

export default InvolvedsSelector;
