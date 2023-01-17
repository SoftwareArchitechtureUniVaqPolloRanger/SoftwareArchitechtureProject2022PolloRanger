import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Paper
} from "@mui/material";
import { red } from '@mui/material/colors';

import rainyImg from "../assets/rainy.png";
import cloudyImg from "../assets/cloudy.png";
import partiallyCloudyImg from "../assets/partiallyCloudy.png";
import sunnyImg from "../assets/sunny.png";
import { useEffect, useState } from "react";
import axios from "axios";

enum WeatherType {
  Rainy = "Rainy",
  Cloudy = "Cloudy",
  PartiallyCloudy = "PartiallyCloudy",
  Sunny = "Sunny",
}

export interface WeatherModel {
  time: string;
  temperature: number;
  weather: WeatherType;
  cloudCover: number;
};

function formatMonth(month: number) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month]
}

export function WeatherCards({ onSelect }: { onSelect: (weatherModel: WeatherModel) => void }) {
  const [weatherData, setWeatherData] = useState<WeatherModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    axios.get('https://api.open-meteo.com/v1/forecast?latitude=-6.211051&longitude=106.845910&hourly=temperature_2m,weathercode,cloudcover')
      .then(resp => {
        const data: WeatherModel[] = [];
        const temperature = resp.data.hourly.temperature_2m;
        const cloudcover = resp.data.hourly.cloudcover;
        [0 ,23 ,47 ,71 ,95 ,121].forEach((value, index) => {
          const code = resp.data.hourly.weathercode[value];
          let weatherType = WeatherType.Sunny;
          if (code === 0 || code === 1) {
            weatherType = WeatherType.Sunny
          }
          else if (code === 2) {
            weatherType = WeatherType.PartiallyCloudy
          }
          else if (code === 3) {
            weatherType = WeatherType.Cloudy
          }
          else if (code >= 51) {
            weatherType = WeatherType.Rainy
          }
          data.push({
            temperature: temperature[value],
            weather: weatherType,
            time: `${formatMonth(new Date().getMonth())} ${new Date().getDate() + index}`,
            cloudCover: cloudcover[value]
          })
        }) 
        setWeatherData(data)
      })
  }, [])
  return (
    <>
      <h2>Weather Forecast</h2>
      <Grid container spacing={'10px'}>
        {weatherData.map((weather, index) => (
          <Grid item xs={2}>
            <Paper key={index} elevation={index === selectedIndex ? 10 : 1} onClick={() => {
              setSelectedIndex(index);
              onSelect(weather);
            }} sx={{ borderRadius: "24px", cursor: 'pointer', position: 'relative', padding: '16px' }}>
              {/* <CardContent sx={{ paddingBottom: '6px !important', }> */}
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {weather.time}
              </Typography>
              <Typography variant="h5" component="div">
                {weather.weather === WeatherType.Rainy && <img style={{ height: '100px' }} src={rainyImg} />}
                {weather.weather === WeatherType.Cloudy && (
                  <img style={{ height: '100px' }} src={cloudyImg} />
                )}
                {weather.weather === WeatherType.PartiallyCloudy && (
                  <img style={{ height: '100px' }} src={partiallyCloudyImg} />
                )}
                {weather.weather === WeatherType.Sunny && <img style={{ height: '100px' }} src={sunnyImg} />}
              </Typography>
              <Typography component='div' color="text.secondary">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span><b>{weather.weather}</b></span>
                </div>
              </Typography>
              <Typography
                fontWeight={600}
                color={red[600]}
                style={{ position: 'absolute', top: 12, right: 16 }}
              >
                {weather.temperature}&deg;
              </Typography>
              {/* </CardContent> */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
