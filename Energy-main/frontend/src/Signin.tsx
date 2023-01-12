import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from './Signin.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

const users = [{
  username: "elixir-office",
  type: "consumer",
  consumerType: "office",
}, {
  username: "kohinoor-textile-mill",
  type: "consumer",
  consumerType: "industry"
}, {
  username: "G94-house-1",
  type: "consumer",
  consumerType: "home",
},
{
  username: "admin",
  type: "admin"
}]

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MMMM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const user = users.find((_user) => {
      return _user.username === username
    })
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    if (!user) {
      alert('Invalid username or password')
      return;
    }
    localStorage.setItem('authInfo', JSON.stringify(user));
    switch (user.type) {
      case "consumer":
        return navigate("/consumer/consumption")
        break;
      case "admin":
        return navigate('/admin')
        break;
    }
  };

  return (
    <div className={styles['signin-container']} style={{ padding: '1rem 2rem' }}>
      <Container style={{ borderRadius: '1rem', backgroundColor: 'white', padding: '1rem 2.5rem' }} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2.5, mb: 1 }} />
      </Container>
    </div>
  );
}