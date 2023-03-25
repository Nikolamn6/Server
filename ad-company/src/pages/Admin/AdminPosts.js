import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuContext } from '../../contexts/MenuContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function AdminPosts() {
    const { menu, setMenu } = useContext(MenuContext);
    setMenu("admin");
    const [userData, setUserData] = useState([]);

    window.localStorage.setItem("menuType", "admin");

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        fetch('http://localhost:9000/getUserPosts', {
            method: 'GET'
          })
          .then((res) => { return res.json(); })
          .then((data) => {console.log(data, "User Data!"); setUserData(data.data);})
    }


    const handleDeletePost = (uId, title) => {
        if(window.confirm(`Are you sure you want to delete ${title}`)){
            fetch('http://localhost:9000/deletePost', {
                method: 'POST',
                crossDomain: true,
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({onePostId: uId})
              })
              .then((res) => { return res.json(); })
              .then((data) => { alert(data.data); getPosts();})
        }else{}
    }

  return (
    <TableContainer component={Paper} sx={{marginTop: "5%"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>E-mail</StyledTableCell>
          <StyledTableCell>Phone</StyledTableCell>
          <StyledTableCell>Title</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>Category</StyledTableCell>
          <StyledTableCell>Price</StyledTableCell>
          <StyledTableCell>Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userData.map((post) => (
          <StyledTableRow key={post._id}>
            <StyledTableCell component="th" scope="row">
              {post.name}
            </StyledTableCell>
            <StyledTableCell>{post.email}</StyledTableCell>
            <StyledTableCell>{post.phone}</StyledTableCell>
            <StyledTableCell>{post.title}</StyledTableCell>
            <StyledTableCell>{post.description}</StyledTableCell>
            <StyledTableCell>{post.category}</StyledTableCell>
            <StyledTableCell>{post.price}</StyledTableCell>
            <StyledTableCell><IconButton size='large' onClick={() => handleDeletePost(post._id, post.title)}><DeleteIcon sx={{ fontSize: 30 }}/></IconButton></StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default AdminPosts