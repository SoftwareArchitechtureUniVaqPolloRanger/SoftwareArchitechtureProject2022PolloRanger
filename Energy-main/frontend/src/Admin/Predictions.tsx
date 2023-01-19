import { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { WaveModel } from "./WaveCards";
import { WeatherModel } from "./WeatherCards";
import { PropaneSharp } from '@mui/icons-material';

export function Predictions({ weather, wave }: { weather?: WeatherModel, wave?: WaveModel }) {
  const [sunPerc, setSunPerc] = useState("");
  const [calculateWeather, setCalculatedWeather] = useState(0)
  const numberOfPanels = 50;
  const panelCapacity = 50;
  const [waveEnergy, setWaveEnergy] = useState(0);
  useEffect(() => {
    const sunPercentage = 100 - (weather?.cloudCover || 0)
    if (sunPercentage < 75) {
      setSunPerc("30")
    }
    else if (sunPercentage >= 75) {
      setSunPerc("100")

    }
    else {
      setSunPerc("0")
    }
    setCalculatedWeather((numberOfPanels*panelCapacity*Number(sunPerc))/1000);
  }, [weather])
  useEffect(()=>{
   const waves = wave?.Wave_Energy || 0;
   setWaveEnergy(waves*10/2.78);
  }, [wave])
  return (
    <>
      <h2>Predictions</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent >
              <Typography variant="h5" component="div" color="#2196f3">
                Solar
              </Typography>
              <Typography>
                Watt/Hour = No. of Panels <b>x</b> Panel Capacity <b>x</b>{" "}
                Percentage of Sun
                
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#4caf50">{calculateWeather+ "kW"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent >
              <Typography variant="h5" component="div" color="#2196f3">
                Marine
              </Typography>
              <Typography>
                Kilo Watt/Hour = 10.000.000 Joules<b>/</b> 2.78m2 <b>x</b> m2
                 
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#4caf50">{waveEnergy.toFixed(2) + "kW"}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
