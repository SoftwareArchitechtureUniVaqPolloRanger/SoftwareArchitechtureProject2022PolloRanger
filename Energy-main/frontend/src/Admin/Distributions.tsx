import { Card, CardContent, Grid, Slider, Switch, Typography } from "@mui/material";

export function Distributions() {
  return (
    <>
      <h2>Power Distribution</h2>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent>
              <Typography variant="h5" component="div" color="#2196f3">
                Available
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#4caf50">190 MW</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent>
              <Typography variant="h5" component="div" color="#2196f3">
                Demand
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#ff9800">201 MW</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent>
              <Typography variant="h5" component="div" color="#2196f3">
                Gap
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#ff5722">21 MW</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>Home</Typography>
          <Slider color="primary" defaultValue={30} aria-label="Disabled slider" />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>Office</Typography>
          <Slider color="primary" defaultValue={40} aria-label="Disabled slider" />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>Industry</Typography>
          <Slider color="primary" defaultValue={10} aria-label="Disabled slider" />
        </Grid>
        <Grid item container alignItems='center' xs={2}>
          <div>
            <Typography variant="h6" color="text.secondary" fontWeight={500}>Geothermal</Typography>
            <Switch />
          </div>
          <div>
            <Typography variant="h6" color="text.secondary" fontWeight={500}>Fossil Fuels</Typography>
            <Switch />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
