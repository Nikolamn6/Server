import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material' 
import CatchingPokemon from '@mui/icons-material/CatchingPokemon'
import { useNavigate } from 'react-router-dom';


function UnloggedMenu() {
  let navigate = useNavigate();

  const handleRedirectMain = (e) => {
    e.preventDefault();
    navigate("/", {replace: true});
  }

  const handleRedirectSignUp = (e) => {
    e.preventDefault();
    navigate("/SignUp", {replace: true});
  }

  const handleRedirectSignIn = (e) => {
    e.preventDefault();
    navigate("/SignIn", {replace: true});
  }

  return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={handleRedirectMain}>
                    <CatchingPokemon sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant='h4' onClick={handleRedirectMain} component='div' sx={{ flexGrow: 1, cursor: 'pointer' }}>bGrow</Typography>
                <Stack direction='row' spacing={2}>
                  <Button variant='text' color='inherit' size='large' onClick={handleRedirectSignUp}>Sign Up</Button>
                  <Button variant='contained' size='large' sx={{background: '#1e88e5'}} onClick={handleRedirectSignIn}>Sign In</Button>
                </Stack>

            </Toolbar>
        </AppBar>
  )
}

export default UnloggedMenu

