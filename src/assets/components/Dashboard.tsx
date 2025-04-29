import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Dashboard() {
  return (
    <Box width="90%" sx={{marginLeft: "5%", padding: "1%"}}>
      <Box display="flex" alignItems="center" >
        <DashboardIcon sx={{marginRight: "10px"}} />
        <Typography variant="h5" color="initial">Dashboard</Typography>
      </Box>
        
    </Box>
  )
}

export default Dashboard
