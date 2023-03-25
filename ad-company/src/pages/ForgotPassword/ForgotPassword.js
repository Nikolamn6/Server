import React, { useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from '../../images/signUp.jpg'
import { useNavigate } from "react-router-dom";
import { MenuContext } from '../../contexts/MenuContext';

const theme = createTheme();

function ForgotPassword() {
    let navigate = useNavigate();
    const { menu, setMenu } = useContext(MenuContext);
    setMenu("false");
  
    const [userEmail, setUserEmail] = useState('');
  
    window.localStorage.setItem("menuType", false);
  
    const handleEmail = (e) => {
        setUserEmail(e.target.value);;
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const email = userEmail;
      setUserEmail("");

      //console.log(email);

      fetch('http://localhost:9000/ResetPassword', {
        method: 'POST',
        crossDomain: true,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({email})
      })
      .then((res) => { return res.json(); })
      .then((data) => { console.log(data, "New User!"); alert(data.status);})
    }
  
    const handleSignIn = (e) => {
        e.preventDefault();
      navigate("/SignIn", {replace: true});
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

            <Typography component="h1" variant="h5"> Forgot password? </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleEmail} value={userEmail} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
              <Grid container>
                <Grid item>
                  <Link href="#"  variant="body2" onClick={handleSignIn}>
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ForgotPassword



