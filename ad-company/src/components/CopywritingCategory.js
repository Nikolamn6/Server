import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ViewModal from './ViewModal';

function CopywritingCategory() {
    const [userPosts, setUserPosts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalId, setModalId] = useState();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        fetch('http://localhost:9000/getUserPostsCopywriting', {
            method: 'GET'
          })
          .then((res) => { return res.json(); })
          .then((data) => {console.log(data, "User posts!"); setUserPosts(data.data);})
    }

    const handleViewPost = (id) => {
      setOpenModal(true);
      setModalId(id);
      //console.log(openModal);
    }
  
    const handleClosePost = (data) => {
      setOpenModal(data);
    }
  return (
    <Grid container spacing={4}>
    {userPosts.map((post) => {
       // const base64String = btoa (String.fromCharCode(...new Uint8Array(post.img.data.data)))
    return (
      <Grid item key={post} xs={12} sm={6} md={4}>
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
               <b>Price:</b> { post.price} $
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleViewPost(post._id)}>View</Button>
            <Button size="small">Order</Button>
          </CardActions>
        </Card>
      </Grid>
    )})}
          {openModal ? <ViewModal onClick={handleClosePost} mId={modalId} /> : ""}
  </Grid>
  )
}

export default CopywritingCategory