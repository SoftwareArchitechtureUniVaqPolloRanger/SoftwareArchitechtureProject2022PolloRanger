import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid
} from "@mui/material";

import rainyImg from "../assets/rainy.png";
import cloudyImg from "../assets/cloudy.png";
import partiallyCloudyImg from "../assets/partiallyCloudy.png";
import sunnyImg from "../assets/sunny.png";

enum WeatherType {
  Rainy = "Rainy",
  Cloudy = "Cloudy",
  PartiallyCloudy = "PartiallyCloudy",
  Sunny = "Sunny",
}

export function WeatherCards() {
  const weatherData = [
    {
      time: "10:00 AM",
      temperature: 10,
      weather: WeatherType.Sunny,
    },
    {
      time: "11:00 AM",
      temperature: 9,
      weather: WeatherType.PartiallyCloudy,
    },
    {
      time: "12:00 PM",
      temperature: 9,
      weather: WeatherType.Cloudy,
    },
    {
      time: "01:00 PM",
      temperature: 8,
      weather: WeatherType.Rainy,
    },
    {
      time: "02:00 PM",
      temperature: 7,
      weather: WeatherType.PartiallyCloudy,
    },
    {
      time: "03:00 PM",
      temperature: 7,
      weather: WeatherType.PartiallyCloudy,
    },
  ];
  return (
    <>
      <h2>Weather Forecast</h2>
      <Grid container spacing={'10px'}>
        {weatherData.map((weather) => (
          <Grid item xs={2}>
            <Card sx={{ borderRadius: "24px" }}>
              <CardContent sx={{ paddingBottom: '6px !important'}}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  At {weather.time}
                </Typography>
                <Typography variant="h5" component="div">
                  {weather.weather === WeatherType.Rainy && <img style={{height: '100px'}} src={rainyImg} />}
                  {weather.weather === WeatherType.Cloudy && (
                    <img style={{height: '100px'}} src={cloudyImg} />
                  )}
                  {weather.weather === WeatherType.PartiallyCloudy && (
                    <img style={{height: '100px'}} src={partiallyCloudyImg} />
                  )}
                  {weather.weather === WeatherType.Sunny && <img style={{height: '100px'}} src={sunnyImg} />}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span><b>{weather.weather}</b></span>
                    <span>{weather.temperature}&deg;</span>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
