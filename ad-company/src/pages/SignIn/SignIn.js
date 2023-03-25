import React, { useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from '../../images/signIn.jpg'
import { useNavigate } from "react-router-dom";
import { MenuContext } from '../../contexts/MenuContext';
import Footer from '../../components/Footer';

const theme = createTheme();

function SignIn() {
  let navigate = useNavigate();
  const { menu, setMenu } = useContext(MenuContext);
  setMenu("false");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  window.localStorage.setItem("menuType", false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password};
    console.log(userData);

    fetch('http://localhost:9000/login-user', {
      method: 'POST',
      crossDomain: true,
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(userData)
    })
    .then((res) => { return res.json(); })
    .then((data) => { 
      console.log(data, "Logged");
      if(data.status === "ok"){
        // alert("success");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("menuType", true);

        console.log(data.userType);

        if(data.userType === "Admin"){
          navigate("/Admin", {replace: true});
        }else{
          navigate("/Profile", {replace: true});
        }
      }
    })

  }

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/SignUp", {replace: true});
  }

  const handleRedirectForgot = (e) => {
    e.preventDefault();
    navigate("/ForgotPassword", {replace: true});
  }


  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh'}}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}
        sx={{ backgroundImage: 'url('+ image +')', backgroundRepeat: 'no-repeat',
        backgroundColor: (t) => 
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /> </Avatar>

          <Typography component="h1" variant="h5"> Sign In </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleEmail} value={email} />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handlePassword} value={password} />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleRedirectForgot}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#"  variant="body2" onClick={handleSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
    <Footer/>
  </ThemeProvider>
  )
}

export default SignIn