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
import Footer from '../../components/Footer';


const theme = createTheme();

function SignUp() {
  let navigate = useNavigate();
  const { menu, setMenu } = useContext(MenuContext);
  setMenu("false");

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const userType = 'User';

  window.localStorage.setItem("menuType", false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleRepPassword = (e) => {
    setRepPassword(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {name, email, phone, password, userType};
    console.log(userData);

    if(password === repPassword){
      fetch('http://localhost:9000/register', {
        method: 'POST',
        crossDomain: true,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      })
      .then((res) => { return res.json(); })
      .then((data) => { console.log(data, "New User!")})

    } else{console.log("Wrong PWD!")}

    setPassword("");
    setRepPassword("");
    setEmail("");
    setName("");
    setPhone("");
  }

  const handleSignIn = (e) => {
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

            <Typography component="h1" variant="h5"> Sign Up </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={handleName} value={name} />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleEmail} value={email} />
              <TextField margin="normal" required fullWidth id="phone" label="Phone number" name="pnone" autoComplete="phone" autoFocus onChange={handlePhone} value={phone} />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handlePassword} value={password} />
              <TextField margin="normal" required fullWidth name="repPassword" label="Repeat password" type="password" id="repPassword" autoComplete="current-password" onChange={handleRepPassword} value={repPassword} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
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
      <Footer/>
    </ThemeProvider>
  );
}

export default SignUp