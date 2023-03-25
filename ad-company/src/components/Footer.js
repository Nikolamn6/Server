import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#f2f2f2', p: 6 }} component="footer">
  <Typography variant="h6" align="center" gutterBottom>
    bGrow
  </Typography>
  <Typography
    variant="subtitle1"
    align="center"
    color="text.secondary"
    component="p"
  >
    Created by Nikola Nedkov! <CopyrightIcon fontSize='5px'/>
  </Typography>
</Box>
  )
}

export default Footer