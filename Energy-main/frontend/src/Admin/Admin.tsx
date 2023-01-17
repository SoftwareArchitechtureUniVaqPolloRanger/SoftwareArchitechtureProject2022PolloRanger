import { useState } from 'react'
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button, Container, Grid } from "@mui/material";
import { WeatherCards, WeatherModel } from "./WeatherCards";
import { UserConsumption } from "./UserConsumption";
import { Availability } from "./Availability";
import { Predictions } from "./Predictions";
import { Distributions } from "./Distributions";
import { WaveCards, WaveModel } from "./WaveCards";
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [selectedWave, setSelectedWave] = useState<WaveModel>()
  const [selectedWeather, setSelectedWeather] = useState<WeatherModel>()
  const [geoThermalToggle, setGeoThermalToggle] = useState(false);
  const [fossilFuelToggle, setFossilFuelToggle] = useState(false);
  const navigate = useNavigate();

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
              {
                //@ts-ignore
                JSON.parse(localStorage.getItem('authInfo')).username
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
        <Grid container>
          <Grid item xs={6}>
            <UserConsumption />
          </Grid>
          <Grid item xs={6}>
            <Availability fossilFuel={fossilFuelToggle} geoThermal={geoThermalToggle} />
          </Grid>
          <Grid item xs={12}>
            <Distributions
              onGeothermalUpdate={(value) => setGeoThermalToggle(value)}
              onFossilFuelUpdate={(value) => setFossilFuelToggle(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <WeatherCards onSelect={setSelectedWeather} />
          </Grid>
          <Grid item xs={12}>
            <WaveCards onSelect={setSelectedWave} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Predictions wave={selectedWave} weather={selectedWeather} />
        </Grid>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </Box>
  );
}
