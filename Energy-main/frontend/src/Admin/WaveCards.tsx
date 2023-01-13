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

import { useEffect, useState } from "react";
import axios from "axios";


export interface WaveModel {
  Wave_Energy: number;
  Wave_Height_Upper: number;
  Wave_Height_Lower: number;
  Prediction_Date: string;
};

export function WaveCards({ onSelect }: { onSelect: (waveModel: WaveModel) => void }) {
  const [waveData, setWaveData] = useState<WaveModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8001/wave')
      .then(resp => {
        const data: WaveModel[] = [];
        resp.data.forEach((waveResp: WaveModel, index: number) => {
          const existingIndex = data.findIndex(row => row.Prediction_Date === waveResp.Prediction_Date)
          if (existingIndex >= 0) {
            data[existingIndex] = {
              Wave_Energy: (data[existingIndex].Wave_Energy + waveResp.Wave_Energy) / 2,
              Wave_Height_Upper: (data[existingIndex].Wave_Height_Upper + waveResp.Wave_Height_Upper) / 2,
              Wave_Height_Lower: (data[existingIndex].Wave_Height_Lower + waveResp.Wave_Height_Lower) / 2,
              Prediction_Date: waveResp.Prediction_Date
            }
          } else {
            data.push(waveResp);
          }
        })
        setWaveData(data)
      })
      .finally(() => { setLoading(false) })
  }, [])
  return (
    <>
      <h2>Wave Forecast</h2>
      <Grid container spacing={'10px'} >
        {loading && 'Loading...'}
        {waveData.map((wave, index) => (
          <Grid item xs={3}>
            <Paper elevation={index === selectedIndex ? 10 : 1} onClick={() => {setSelectedIndex(index); onSelect(wave)}} sx={{ borderRadius: "24px", cursor: 'pointer', position: 'relative', padding: '16px' }}>
              {/* <CardContent sx={{ paddingBottom: '6px !important', }> */}
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {wave.Prediction_Date}
              </Typography>
              <Typography variant="h5" component="div">

              </Typography>
              <Typography component='h1' color="text.secondary" fontSize={'2rem'}>
                {wave.Wave_Energy.toFixed(2)} (J/m2)
              </Typography>
              <Typography
                fontWeight={600}
                color={red[600]}
                style={{ position: 'absolute', top: 12, right: 16 }}
              >
                H: {wave.Wave_Height_Upper} L: {wave.Wave_Height_Lower}
              </Typography>
              {/* </CardContent> */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
