import { Card, CardContent, Grid, Slider, Switch, Typography } from "@mui/material";

export function Distributions() {
  const marks = [
    {
      value: 10,
      label: '10MW',
    },
    {
      value: 20,
      label: '20MW',
    },
    {
      value: 30,
      label: '30MW',
    },
    {
      value: 40,
      label: '40MW',
    },
    {
      value: 50,
      label: '50MW',
    },
    {
      value: 60,
      label: '60MW',
    },
    {
      value: 70,
      label: '70MW',
    },
    {
      value: 80,
      label: '80MW',
    },
    {
      value: 90,
      label: '90MW',
    },
  ];
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
          <Slider step={10} min={0} max={100} marks={marks} color="primary" defaultValue={30} aria-label="Disabled slider" />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>Office</Typography>
          <Slider step={10} min={0} max={100} marks={marks} color="primary" defaultValue={40} aria-label="Disabled slider" />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>Industry</Typography>
          <Slider step={10} min={0} max={100} marks={marks} color="primary" defaultValue={10} aria-label="Disabled slider" />
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
