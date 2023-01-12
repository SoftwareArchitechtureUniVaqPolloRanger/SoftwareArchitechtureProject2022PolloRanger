import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid
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

interface WeatherModel {
  time: string;
  temperature: number;
  weather: WeatherType;
};

function formatHour(hour: number) {
  const over12 = hour > 12;
  hour = hour % 12
  return `${hour < 10 ? '0' : ''}${hour}:00 ${over12 ? 'PM' : 'AM'}`
}

export function WeatherCards() {
  const [weatherData, setWeatherData] = useState<WeatherModel[]>([]);
  useEffect(() => {
    axios.get('https://api.open-meteo.com/v1/forecast?latitude=-6.211051&longitude=106.845910&hourly=temperature_2m,weathercode')
      .then(resp => {
        const data: WeatherModel[] = [];
        const temperature = resp.data.hourly.temperature_2m.slice(6);
        resp.data.hourly.weathercode.slice(0, 6).forEach((code: number, index: number) => {
          let weatherType = WeatherType.Sunny;
          if (code === 0) {
            weatherType = WeatherType.Sunny
          }
          else if (code > 0 && code < 4) {
            weatherType = WeatherType.PartiallyCloudy
          }
          else if (code >= 45 && code <= 48) {
            weatherType = WeatherType.Cloudy
          }
          else if (code >= 51) {
            weatherType = WeatherType.Rainy
          }
          data.push({
            temperature: temperature[index],
            weather: weatherType,
            time: `${formatHour(new Date().getHours() + index)}`
          })
        })
        setWeatherData(data)
      })
  }, [])
  return (
    <>
      <h2>Weather Forecast</h2>
      <Grid container spacing={'10px'}>
        {weatherData.map((weather) => (
          <Grid item xs={2}>
            <Card sx={{ borderRadius: "24px" }}>
              <CardContent sx={{ paddingBottom: '6px !important', position: 'relative' }}>
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
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
