import React, { useState, useContext } from 'react'
import './css/FileInput.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ImageContext } from '../contexts/ImageContext';
import Grid from '@mui/material/Grid';

function GalleryForm() {
    const { images, setImages } = useContext(ImageContext);

    const [image, setImage] = useState('');
    const [displayImg, setDislpayImg] = useState('');

    const handleImage = (e) => {
      const file = e.target.files[0];

        setImage(file);
        setImages(file);

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setDislpayImg(reader.result);
          }
        }
        
        if (file) {
          reader.readAsDataURL(file);
        }
    }

  return (
  <Box component="form"  noValidate sx={{ mt: 1 }}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
        <Typography variant='h5'>Add picture</Typography>
        <Typography variant='p'>Add simple image that describes yout work!</Typography>
    </Grid>
    <Grid item xs={6}>
    <div className="file-input-wrapper">
      <input type="file" onChange={handleImage}/>
      <span className='btn'></span>
      <span className="file-input-name"></span>
    </div>
    </Grid>

    <Grid item xs={6}>{ displayImg && (<img src={displayImg} alt="Selected" style={{ maxWidth: "300px" }} />) }</Grid>
      
    <Grid item xs={12}>{ image != "" ? <Typography variant='p' sx={{background: '#1e88e5', color: '#fff', padding: '5px', margin: '10px', borderRadius: '10px', paddingLeft: '20px', paddingRight: '20px'}}>You successfully selected {images.name}</Typography> : "" }</Grid>
      </Grid>
    </Box>
  )
}

export default GalleryForm