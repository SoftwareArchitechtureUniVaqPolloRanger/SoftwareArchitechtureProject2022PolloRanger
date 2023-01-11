import { Card, CardContent, Grid, Typography } from "@mui/material";

export function Predictions() {
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
              <Typography variant="h2" fontWeight={500} color="#4caf50">110MW</Typography>
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
                Watt/Hour = No. of Panels <b>x</b> Panel Capacity <b>x</b>{" "}
                Percentage of Sun
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#4caf50">70MW</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
