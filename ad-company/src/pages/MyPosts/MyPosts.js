import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuContext } from '../../contexts/MenuContext';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import ViewModal from '../../components/ViewModal';
import Footer from '../../components/Footer';


const theme = createTheme();

function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState();
  const [image, setImage] = useState('');
  const [br, setBr] = useState(0);

  useEffect(() => {
    fetch('http://localhost:9000/userData', {
      method: 'POST',
      crossDomain: true,
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({token: window.localStorage.getItem("token")})
    })
    .then((res) => { return res.json(); })
    .then((data) => {setUserEmail(data.data.email); getPosts(data.data.email); console.log(data, "New Data!");})
  }, []);


  const handleClickOpen = (id) => {
    setPostId(id);
    fetch('http://localhost:9000/getOnePosts', {
      method: 'POST',
      crossDomain: true,
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({id})
    })
    .then((res) => { return res.json(); })
    .then((data) => {
      console.log(data, "Post");
      setTitle(data.data[0].title);
      setCategory(data.data[0].category);
      setPrice(data.data[0].price);
      setDescription(data.data[0].description);
      setPost(data.data[0]);
      })

      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPosts = (email) => {
    fetch('http://localhost:9000/getMyPosts', {
      method: 'POST',
      crossDomain: true,
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ email })
    })
    .then((res) => { return res.json(); })
    .then((data) => { console.log(data, "New Data!"); setMyPosts(data.data)})
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
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

const handleDescription = (e) => {
  setDescription(e.target.value);
}

  const handleEditPost = () => {
    const userData = { id: postId, title, category, price, description };

    fetch('http://localhost:9000/updateOnePosts', {
      method: 'POST',
      crossDomain: true,
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(userData)
    })
    .then((res) => { return res.json(); })
    .then((data) => { 
      console.log(data, "Updated");
      setOpen(false);
      getPosts(userEmail);
    })
  }

  const handleViewPost = (id) => {
    setOpenModal(true);
    setModalId(id);
    //console.log(openModal);
  }

  const handleClosePost = (data) => {
    setOpenModal(data);
  }

  const handleDelete = () => {
    if(window.confirm(`Are you sure you want to delete ${title}`)){
      fetch('http://localhost:9000/deletePost', {
          method: 'POST',
          crossDomain: true,
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({onePostId: postId})
        })
        .then((res) => { return res.json(); })
        .then((data) => { alert(data.data); setOpen(false); getPosts(userEmail);})
  }else{}
  }
  
  return (
    <ThemeProvider theme={theme}>

<CssBaseline />

<main>
  <Box
    sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
    }}
  >
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Your posts
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
      Here are all you posts
      </Typography>
    </Container>
  </Box>
  <Container sx={{ py: 8 }} maxWidth="md">
  <Grid container spacing={4}>
    {myPosts && myPosts.map((post) => {
         //const base64String = post.img ? btoa(String.fromCharCode(...new Uint8Array(post.img.data.data))) : '';
    return (
      <Grid item key={post._id} xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{pt: '56.25%',}}
            image={"https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              { post.title }
            </Typography>
            <Typography>
                { post.description}
            </Typography>
            <Typography>
               <b>Category:</b> { post.category }
            </Typography>
            <Typography>
               <b>Price:</b> { post.price } $
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleViewPost(post._id)}>View</Button>
            <Button size="small" onClick={() => handleClickOpen(post._id)}>Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    )})}
  </Grid>
  </Container>
</main>

<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update post, enter correct values!
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="title"
            placeholder="Title"
            value={title}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTitle}
          />
        <TextField id="outlined-select-currency" fullWidth margin="normal" select label="Category" defaultValue="Freelance" helperText="Please select your category" onChange={handleCategory}>
        <MenuItem value="Copywriting">Copywriting</MenuItem>
        <MenuItem value="Freelance">Freelance</MenuItem>
        <MenuItem value="E-commerce">E-commerce</MenuItem>
        <MenuItem value="Affiliate marketing">Affiliate marketing</MenuItem>
    </TextField>
    <TextField id="outlined-number" margin="normal" fullWidth placeholder="Price" type="number" value={price} onChange={handlePrice} onTransitionEnd={handleCheck} />

    <TextField margin="normal" multiline required fullWidth id="description" placeholder="Description" name="description" autoComplete="description" autoFocus onChange={handleDescription} value={description} rows={6}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditPost}>Update</Button>
          <Button onClick={handleDelete} variant='contained'>Delete</Button>
        </DialogActions>
      </Dialog>

      {openModal ? <ViewModal onClick={handleClosePost} mId={modalId} /> : ""}

<Footer/>
</ThemeProvider>
  )
}

export default MyPosts