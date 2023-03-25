import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { ImageContext } from '../contexts/ImageContext';
import Grid from '@mui/material/Grid';


function PreviewSection() {
  const { images, setImages } = useContext(ImageContext);

  const [displayImg, setDislpayImg] = useState('');

  const name = JSON.parse(localStorage.getItem("Name"));
  const email = JSON.parse(localStorage.getItem("Email"));
  const phone = JSON.parse(localStorage.getItem("Phone"));
  const title = JSON.parse(localStorage.getItem("Title"));
  const description = JSON.parse(localStorage.getItem("Description"));
  const category = JSON.parse(localStorage.getItem("Category"));
  const price = JSON.parse(localStorage.getItem("Price"));

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setDislpayImg(reader.result);
      }
    }
    
    if (images) {
      reader.readAsDataURL(images);
    }
  }, [])
  return (
    <Box sx={{ marginTop: '20px'}}> 
    <Grid container spacing={2}>
    <Grid item xs={5}>{ displayImg && (<img src={displayImg} alt="Selected" style={{ maxWidth: "300px" }} />) }</Grid>
    <Grid item xs={7}>
      <Typography variant='p' component="p">{ name }</Typography>
      <Typography variant='p' component="p">{ email }</Typography>
      <Typography variant='p' component="p">{ phone }</Typography>
      <Typography variant='p' component="p">{ title }</Typography>
      <Typography variant='p' component="p">{ description }</Typography>
      <Typography variant='p' component="p">{ category }</Typography>
      <Typography variant='p' component="p">{ price } $</Typography></Grid>
      </Grid>
    </Box>
  )
}

export default PreviewSection