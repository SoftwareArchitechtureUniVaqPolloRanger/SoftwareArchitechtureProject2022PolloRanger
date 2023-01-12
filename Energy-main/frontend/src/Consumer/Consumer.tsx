import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { Button, Tabs } from '@mui/material';
import Tab from "@mui/material/Tab";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function getCurrentTab() {
  switch(window.location.pathname) {
    case '/dashboard/consumption':
      return 0
    case '/dashboard/cost':
      return 1
    case '/dashboard/availability':
      return 2
    default:
      return 0;
  }
}

export default function Dashboard() {
  const [value, setValue] = useState(getCurrentTab())
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const logout = (e: any) => {
    localStorage.removeItem('authInfo');
    navigate('/signin')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             {  //@ts-ignore 
             JSON.parse(localStorage?.getItem('authInfo'))?.username
             }   
            </Typography>
            <Button color="inherit" onClick={logout}>
              Log out
              <ExitToAppIcon />
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
          <Tab component={Link} label="Consumption" to="consumption" />
          <Tab component={Link} label="Cost" to="cost" />
          <Tab component={Link} label="Availability" to="availability" />
        </Tabs>
        <Outlet />
      </Container>
    </Box>
  );
}
