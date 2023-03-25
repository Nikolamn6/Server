import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


function AddBlog() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState('');
    const [displayImg, setDislpayImg] = useState('');

    localStorage.setItem("Name", JSON.stringify(name));
    localStorage.setItem("Email", JSON.stringify(email));

    useEffect(() => {
        fetch('http://localhost:9000/userData', {
            method: 'POST',
            crossDomain: true,
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({token: window.localStorage.getItem("token")})
          })
          .then((res) => { return res.json(); })
          .then((data) => { console.log(data, "New Data!"); setName(data.data.name); setEmail(data.data.email);})
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
      }
    
      const handleName = (e) => {
        setName(e.target.value);
      }

      const handleTitle = (e) => {
        setTitle(e.target.value);
      }

      const handleContent = (e) => {
        setContent(e.target.value);
      }

      const handleImage = (e) => {
        const file = e.target.files[0];
  
          setImage(file);
  
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

      const handleSubmit = (e) => {
        const testImage = image;
        const type = "Blog";

        const formData = new FormData();
        formData.append('testImage', testImage);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);

        //console.log(formData);

        // console.log(testImage);
        // console.log(name);
        // console.log(email);
        // console.log(title);
        // console.log(content);
        
        fetch('http://localhost:9000/PostBlog', { method: 'POST', body: formData })
        .then((res) => { return res.json(); })
       .then((data) => { console.log(data, "Added")})

       alert("Added!");
       setTitle("");
       setContent("");
       setImage('');
       setDislpayImg('');
      }

  return (
  <Box sx={{ width: '80%', marginTop:'15%', marginLeft:'10%' }}>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <Typography variant='h5'>Add Blog</Typography>
    <Typography variant='p'>Your contacts will be visible for everyone at the blog.</Typography>
    <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={handleName} value={name} />
    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleEmail} value={email} />
    <TextField margin="normal" required fullWidth id="title" label="Title" name="title" autoComplete="title" autoFocus onChange={handleTitle} value={title} />
    <TextField margin="normal" multiline required fullWidth id="content" label="Blog content" name="content" autoComplete="content" autoFocus onChange={handleContent} value={content} rows={3}/>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant='p'>Add simple image that describes yout blog!</Typography>
        </Grid>
        <Grid item xs={6}>
        <div className="file-input-wrapper">
          <input type="file" onChange={handleImage}/>
          <span className='btn'></span>
          <span className="file-input-name"></span>
        </div>
        </Grid>
    
        <Grid item xs={6}>{ displayImg && (<img src={displayImg} alt="Selected" style={{ maxWidth: "300px" }} />) }</Grid>
          
        {/* <Grid item xs={12}>{ image != "" ? <Typography variant='p' sx={{background: '#1e88e5', color: '#fff', padding: '5px', margin: '10px', borderRadius: '10px', paddingLeft: '20px', paddingRight: '20px'}}>You successfully selected {images.name}</Typography> : "" }</Grid> */}
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleSubmit} variant='contained'>Post Blog</Button>
        </Box>
  </Box>
  </Box>
  )
}

export default AddBlog