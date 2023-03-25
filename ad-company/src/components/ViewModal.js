import React, { useState, useEffect } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

function ViewModal(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [post, setPost] = useState([]);
    const [imgSource, setImgSource] = useState();

    useEffect(() => {
        const id =  props.mId ;
        fetch('http://localhost:9000/getSpecificPost', {
            method: 'POST',
            crossDomain: true,
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ id })
          })
          .then((res) => { return res.json(); })
          .then((data) => {
            console.log(data, "Post found!"); 
            setPost(data.data[0]); 
            console.log(data.data[0])
            //setImgSource(btoa (String.fromCharCode(...new Uint8Array(data.data[0].img.data.data))));
        })
      }, [props.mId]);

    const handleOpen = () => {
      setIsOpen(true);
    };
  
    const handleClose = () => {
      props.onClick(false);
      setIsOpen(false);
    };

  return (
    <>
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="big-modal-title"
      aria-describedby="big-modal-description"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '32px',
          outline: 'none',
          borderRadius: '8px',
          maxWidth: '80vw',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" id="big-modal-title" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" id="big-modal-description">
         <p maxWidth="600px"> <Typography variant='p'>{post.description}</Typography></p>
         <p><Typography variant='p'><b>Category: </b>{post.category}</Typography></p>
          <p><Typography variant='p'><b>Price: </b>{post.price} $</Typography></p>
          <h3>Author info: </h3>
          <p><Typography variant='p'><b>Names: </b>{post.name} </Typography></p>
          <p><Typography variant='p'><b>E-Mail: </b>{post.email} </Typography></p>
          <p><Typography variant='p'><b>Phone: </b>{post.phone} </Typography></p>
          <Typography variant='img'>
          <CardMedia
            component="img"
            sx={{pt: '56.25%', float: 'right'}}
            image={"https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"}
            alt="random"
          />
          </Typography>
        </Typography>
        <Button onClick={handleClose}>Close</Button>
        {/* {props.deleteBtn ? <Button onClick={handleClose}>Delete</Button> : ""} */}
      </div>
    </Modal>
  </>
  )
}

export default ViewModal