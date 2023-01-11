import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button, Container, Grid } from "@mui/material";
import { WeatherCards } from "./WeatherCards";
import { UserConsumption } from "./UserConsumption";
import { Availability } from "./Availability";
import { Predictions } from "./Predictions";
import { Distributions } from "./Distributions";

export default function Admin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">
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
            <Availability />
          </Grid>
          <Grid item xs={12}>
            <WeatherCards />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Predictions />
        </Grid>
        <Grid item xs={12}>
          <Distributions />
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
