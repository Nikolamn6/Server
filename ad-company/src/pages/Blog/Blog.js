import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Avatar, Pagination } from '@mui/material';
import BlogPost from '../../components/BlogPost';
import Footer from '../../components/Footer';


function Blog() {
    const [userBlogs, setUserBlogs] = useState([]);
    //const [url, setUrl]=useState();

    useEffect(() => {
        getBlogs("Blog");
    }, []);

    const getBlogs = (type) => {
        // fetch('http://localhost:9000/getUserBlogs', {
        //     method: 'GET'
        //   })
        //   .then((res) => { return res.json(); })
        //   .then((data) => {console.log(data, "User blogs!"); setUserBlogs(data.data);})
        fetch('http://localhost:9000/getUserBlogs', {
            method: 'POST',
            crossDomain: true,
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ type })
          })
          .then((res) => { return res.json(); })
          .then((data) => { console.log(data, "New Data!"); setUserBlogs(data.data)})
    }

  return (
<div className="App">
<Box
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')`,
          height: "500px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "4rem",
          "@media (max-width: 600px)": {
            height: 300,
            fontSize: "3em",
          },
        }}
      >
        <Box>Blog</Box>
      </Box>
      <Container maxWidth="lg" style={{ paddingTop: "2rem" }}>
        <Typography variant="h4" style={{ fontWeight: 800, paddingBottom: "1.5rem" }}>
          Articles
        </Typography>
        <Grid container spacing={3}>
        {userBlogs.map((blog) => {
            //const base64String = btoa (String.fromCharCode(new Uint8Array(blog.img.data.data)))
    return (
        <BlogPost name={blog.name} content={blog.content} title={blog.title} source="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"/>
    )})}
        </Grid>
        <Box my={4} style={{display: "flex", justifyContent: "center"}}>
          {/* <Pagination count={10} /> */}
        </Box>
      </Container>
      <Footer/>
    </div>
  )
}

export default Blog