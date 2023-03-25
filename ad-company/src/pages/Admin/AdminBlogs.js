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

function AdminBlogs() {
    const { menu, setMenu } = useContext(MenuContext);
    setMenu("admin");
    const [userData, setUserData] = useState([]);

    window.localStorage.setItem("menuType", "admin");

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = () => {
        fetch('http://localhost:9000/getUserBlogs', {
            method: 'GET'
          })
          .then((res) => { return res.json(); })
          .then((data) => {console.log(data, "User Data!"); setUserData(data.data);})
    }


    const handleDeleteBlog = (uId, title) => {
        if(window.confirm(`Are you sure you want to delete ${title}`)){
            fetch('http://localhost:9000/deleteBlog', {
                method: 'POST',
                crossDomain: true,
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({id: uId})
              })
              .then((res) => { return res.json(); })
              .then((data) => { alert(data.data); getBlogs();})
        }else{}
    }

  return (
    // <div></div>
    <TableContainer component={Paper} sx={{marginTop: "5%"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell align="right">E-mail</StyledTableCell>
          <StyledTableCell align="right">Title</StyledTableCell>
          <StyledTableCell align="right">Content</StyledTableCell>
          <StyledTableCell align="right">Type</StyledTableCell>
          <StyledTableCell align="right">Date</StyledTableCell>
          <StyledTableCell align="right">Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userData.map((blog) => (
          <StyledTableRow key={blog._id}>
            <StyledTableCell component="th" scope="row">
              {blog.name}
            </StyledTableCell>
            <StyledTableCell align="right">{blog.email}</StyledTableCell>
            <StyledTableCell align="right">{blog.title}</StyledTableCell>
            <StyledTableCell align="right">{blog.content}</StyledTableCell>
            <StyledTableCell align="right">{blog.type}</StyledTableCell>
            <StyledTableCell align="right">Mar 25, 2023</StyledTableCell>
            <StyledTableCell align="right"><IconButton size='large' onClick={() => handleDeleteBlog(blog._id, blog.title)}><DeleteIcon sx={{ fontSize: 30 }}/></IconButton></StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default AdminBlogs