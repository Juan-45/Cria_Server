import { Tabs, Tab, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const TabsContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.grey[300],
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.secondary.main,
  },

  "& .MuiTab-root": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.grey[400],
  },

  "& .MuiTab-root.Mui-selected": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.medium,
  },
}));

const SessionSelectorTab = ({ isSession, selectSessionType }) => {
  return (
    <TabsContainer>
      <StyledTabs
        value={isSession}
        onChange={selectSessionType}
        aria-label='session tabs'
        centered
      >
        <Tab label='Sesión previa' value={0} />
        <Tab label='Sesión actual' value={1} />
      </StyledTabs>
    </TabsContainer>
  );
};

export default SessionSelectorTab;
