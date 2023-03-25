import React, { useEffect, useState, useContext } from 'react'
import { Grid } from '@mui/material';
import { MenuContext } from '../../contexts/MenuContext';
import Box from '@mui/material/Box';

function Dashboard() {
    const { menu, setMenu } = useContext(MenuContext);
    setMenu("true");
    window.localStorage.setItem("menuType", true);

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={3} sx={{width:'70%' ,marginTop: '10%', marginLeft: '25%'}}>
  <Grid item xs={4} sx={{background:'#1e88e5', width:'100px'}}>
    <p >xs</p>
  </Grid>
  <Grid item xs={4} sx={{background:'#1e88e5'}}>
    <p>xs=6</p>
  </Grid>
  <Grid item xs={4} sx={{background:'#1e88e5'}}>
    <p>xs</p>
  </Grid>
</Grid>
</Box>
  )
}

export default Dashboard