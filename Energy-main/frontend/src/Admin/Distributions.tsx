import { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Slider, Switch, Typography } from "@mui/material";
import axios from 'axios'

type VoidFunction = (value: boolean) => void

export function Distributions({ onGeothermalUpdate, onFossilFuelUpdate }: { onGeothermalUpdate: VoidFunction, onFossilFuelUpdate: VoidFunction }) {
  const [demand, setDemand] = useState(0);
  const [gap, setGap] = useState(0);
  const [homePower, setHomePower] = useState(102)
  const [officePower, setOfficePower] = useState(200)
  const [industryPower, setIndustryPower] = useState(400)
  const [geothermal, setGeoThermal] = useState({ value: 0, cost: 0 });
  const [fossilFuel, setFossilFuel] = useState({ value: 0, cost: 0 })
  const [hydro, setHydro] = useState(0)
  const [solar, setSolar] = useState(0)
  const available = solar + hydro + geothermal.value + fossilFuel.value;

  useEffect(() => {
    //@ts-ignore
    const usage = [];

    Promise.all([
      axios.get(`http://localhost:4000/smart-grid/user-consumption/home-consumption/timestamp/2023-01-11T01:00:00Z`),
      axios.get(`http://localhost:4000/smart-grid/user-consumption/office-consumption/timestamp/2023-01-11T01:00:00Z`),
      axios.get(`http://localhost:4000/smart-grid/user-consumption/office-consumption/timestamp/2023-01-11T01:00:00Z`)
      //@ts-ignore
    ]).then(responses => {
      responses.forEach((resp, index) => {
        usage.push(resp.data.totalUnits)

      });
      //@ts-ignore
      setDemand(usage.reduce((acc, val) => acc + val, 0))

    })
    //@ts-ignore
    // @ts-ignore
    axios.get(`http://localhost:3001/power-plant/timestamp/2023-01-11T01:00:00Z`).then(response => {
      setGeoThermal({ value: response?.data?.geothermal?.power, cost: response?.data?.geothermal?.cost })
      setFossilFuel({ value: response?.data?.fossilFuel?.power, cost: response?.data?.fossilFuel?.cost })
    })

  }, [])
  useEffect(() => {
    let dataArr = []
    axios.get(`http://localhost:3001/power-plant/timestamp/2023-01-11T01:00:00Z`).then(response => {
      dataArr = [response?.data?.hydro?.power, response?.data?.solar?.power, response?.data?.geothermal?.power, response?.data?.fossilFuel?.power]
      setHydro(response?.data?.hydro?.power || 0)
      setSolar(response?.data?.solar?.power)
    })
    //@ts-ignore
    //@ts-ignore

  }, [])
  useEffect(() => {
    if (available - demand < 0) {
      setGap(Math.abs(available - demand))
    }
    else if (available - demand >= 0) {
      setGap(0)
    }
    axios.post('http://localhost:2500/SmartGridService/UnusedStorageService/', {
      power: available-demand,
      unit:'kW', timestamp: "2023-01-11T01:00:00Z"
    }).then(res => console.log(res))
  }, [geothermal, fossilFuel, hydro, solar])
  //@ts-ignore
  const setHome = (e, v) => {
    setHomePower(v)
  }
  //@ts-ignore
  const setOffice = (e, v) => {
    setOfficePower(v)
  }
  //@ts-ignore
  const setIndustry = (e, v) => {
    setIndustryPower(v)
  }

  const updateFossilFuel = ({ power, cost }: { power: number, cost: number }) => {
    setFossilFuel({ value: power, cost })
    axios.put(`http://localhost:3001/power-plant/timestamp/2023-01-11T01:00:00Z`, {
      fossilFuel: {
        "power": power,
        "cost": cost,
        "powerUnit": "kW",
        "costUnit": "rp"
      },
    }).then(resp => {
      console.log(resp)
    })
    onFossilFuelUpdate(power !== 0);
  }
  const updateGeoThermal = ({ power, cost }: { power: number, cost: number }) => {
    setGeoThermal({ value: power, cost })
    axios.put(`http://localhost:3001/power-plant/timestamp/2023-01-11T01:00:00Z`, {
      geothermal: {
        "power": power,
        "cost": cost,
        "powerUnit": "kW",
        "costUnit": "rp"
      },
    }).then(resp => {
      console.log(resp)
    })
    onGeothermalUpdate(power !== 0);
  }

  useEffect(() => {
    if (officePower && homePower && industryPower) {
      axios.put(`http://localhost:4002/power-supplier/power-distribution/timestamp/2023-01-11T01:00:00Z`, {
        timestamp: "2023-01-11T01:00:00Z",
        residentialAreaSupply: homePower,
        officeSupply: officePower,
        industrialSupply: industryPower,
        cost: ""
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })

    }

  }, [homePower, industryPower, officePower])
  const marks = [
    {
      value: 100,
      label: '100kW',
    },
    {
      value: 200,
      label: '200kW',
    },
    {
      value: 300,
      label: '300kW',
    },
    {
      value: 400,
      label: '400kW',
    },
    {
      value: 500,
      label: '500kW',
    },
    {
      value: 600,
      label: '600kW',
    },
    {
      value: 700,
      label: '700kW',
    },
    {
      value: 800,
      label: '800kW',
    },
    {
      value: 900,
      label: '900kW',
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
              <Typography variant="h2" fontWeight={500} color="#4caf50">{available} kW</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent>
              <Typography variant="h5" component="div" color="#2196f3">
                Demand
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#ff9800">{demand + "kW"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent>
              <Typography variant="h5" component="div" color="#2196f3">
                Gap
              </Typography>
              <Typography variant="h2" fontWeight={500} color="#ff5722">{gap + "kW"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>

            <Grid item xs={10}>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>Home</Typography>
              <Slider step={100} min={100} max={900} marks={marks} color="primary" defaultValue={homePower} aria-label="Disabled slider"
                onChange={setHome} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>{homePower}kW</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>Office</Typography>
              <Slider step={100} min={100} max={900} marks={marks} color="primary" defaultValue={officePower} aria-label="Disabled slider" onChange={setOffice} />

            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>{officePower}kW</Typography>

            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>Industry</Typography>
              <Slider step={100} min={100} max={900} marks={marks} color="primary" defaultValue={industryPower} aria-label="Disabled slider"
                onChange={setIndustry} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>{industryPower}kW</Typography>

            </Grid>
          </Grid>

        </Grid>
        <Grid item container justifyContent='space-evenly'>
          <Grid item xs={6}>
            <div>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>Geothermal:{`${geothermal.value} kW`}</Typography>
              <Switch checked={geothermal.value !== 0} onChange={(_, v) => updateGeoThermal({ power: v === true ? 100 : 0, cost: v === true ? 10 : 0 })} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>Fossil Fuels: {`${fossilFuel.value} kW`}</Typography>
              <Switch checked={fossilFuel.value !== 0} onChange={(_, v) => updateFossilFuel({ power: v === true ? 100 : 0, cost: v === true ? 10 : 0 })} />
            </div>
          </Grid>

        </Grid>
      </Grid>
    </>
  );
}
