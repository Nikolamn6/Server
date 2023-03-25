import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';

function DescriptionForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Freelance");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

     localStorage.setItem("Title", JSON.stringify(title));
     localStorage.setItem("Description", JSON.stringify(description));
     localStorage.setItem("Category", JSON.stringify(category));
     localStorage.setItem("Price", JSON.stringify(price));
     

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleCheck = () => {
        if(price < 0) {setPrice(0);}
        if(price.length <= 0 ) {setPrice(0);}
    }

    //console.log(category);
  return (
    <Box component="form"  noValidate sx={{ mt: 1 }}>
    <Typography variant='h5'>Add service</Typography>
    <TextField margin="normal" required fullWidth id="title" label="Title" name="title" autoComplete="title" autoFocus onChange={handleTitle} value={title} />
    <TextField margin="normal" multiline required fullWidth id="description" label="Description" name="description" autoComplete="description" autoFocus onChange={handleDescription} value={description} rows={6}/>
    <TextField id="outlined-select-currency" fullWidth margin="normal" select label="Category" defaultValue="Freelance" helperText="Please select your category" onChange={handleCategory}>
        <MenuItem value="Copywriting">Copywriting</MenuItem>
        <MenuItem value="Freelance">Freelance</MenuItem>
        <MenuItem value="E-commerce">E-commerce</MenuItem>
        <MenuItem value="Affiliate marketing">Affiliate marketing</MenuItem>
    </TextField>
    <TextField id="outlined-number" margin="normal" fullWidth label="Price" type="number" value={price} onChange={handlePrice} onTransitionEnd={handleCheck} />
  </Box>
  )
}

export default DescriptionForm

