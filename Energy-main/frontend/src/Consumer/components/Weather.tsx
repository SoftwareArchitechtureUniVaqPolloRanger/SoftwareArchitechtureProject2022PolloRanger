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
  
  import rainyImg from "../../assets/rainy.png";
  import cloudyImg from "../../assets/cloudy.png";
  import partiallyCloudyImg from "../../assets/partiallyCloudy.png";
  import sunnyImg from "../../assets/sunny.png";
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
  
  export function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherModel[]>([]);
    const [suggestions, setSuggestions] = useState("");
    useEffect(() => {
      axios.get('https://api.open-meteo.com/v1/forecast?latitude=-6.211051&longitude=106.845910&hourly=temperature_2m,weathercode,cloudcover')
        .then(resp => {
          const data: WeatherModel[] = [];
          const temperature = resp.data.hourly.temperature_2m.slice(6);
          const cloudcover = resp.data.hourly.cloudcover.slice(6);
          resp.data.hourly.weathercode.slice(0, 6).forEach((code: number, index: number) => {
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
              temperature: temperature[index],
              weather: weatherType,
              time: `${formatMonth(new Date().getMonth())} ${new Date().getDate() + index}`,
              cloudCover: cloudcover[index]
            })
          })
          setWeatherData(data)
        })
    }, [])
    useEffect(()=>{
        if(weatherData){
            if(weatherData?.[0]?.weather==="Sunny" || weatherData?.[0]?.weather==="PartiallyCloudy"){
                 const sugg = "Use washing machine in daytime.\n Minimize use of stove in nightime.\n Cut down using heater in daytime";
                 //@ts-ignore
                 setSuggestions(sugg.split('\n').map(line => <li>{line}</li>))
            }
            //@ts-ignore
            if(weatherData?.[0]?.weather==="Rainy" || weatherData?.[0]?.weather==="Cloudy"){
                const sugg=" Avoid using washing machine in these days.\n  Try to cut down use of stove.\n Try to use automatic heaters";
                //@ts-ignore
                setSuggestions(sugg.split('\n').map(line => <li>{line}</li>))
            }
        }
    }, [weatherData])
    return (
      <>
        <Grid container spacing={'10px'}>
          {weatherData.map((weather, index) => (
            <Grid item xs={2}>
              <Paper key={index}  sx={{ borderRadius: "24px", cursor: 'pointer', position: 'relative', padding: '16px' }}>
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
        <div className="d-flex align-items-center justify-content center m-4 container">
        <h2 className = "d-flex justify-content-center align-items-center">Suggestions</h2>
        <p className="d-flex justify-content-center align-items-center" style={{ marginBottom: "50px" , paddingBottom: "50px"}}>{suggestions}</p>
        </div>        
        
      </>
    );
  }
  