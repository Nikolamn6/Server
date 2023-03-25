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
  
  
function AdminHome() {
    const { menu, setMenu } = useContext(MenuContext);
    setMenu("admin");

    const [userData, setUserData] = useState([]);

    window.localStorage.setItem("menuType", "admin");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        fetch('http://localhost:9000/getUserInfo', {
            method: 'GET'
          })
          .then((res) => { return res.json(); })
          .then((data) => {console.log(data, "User Data!"); setUserData(data.data);})
    }

    const handleDeleteUser = (id, name) => {
        if(window.confirm(`Are you sure you want to delete ${name}`)){
            fetch('http://localhost:9000/deleteUser', {
                method: 'POST',
                crossDomain: true,
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({userId: id})
              })
              .then((res) => { return res.json(); })
              .then((data) => { alert(data.data); getUsers();})
        }else{}
    }
  return (
    <TableContainer component={Paper} sx={{marginTop: "5%"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">E-mail</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.phone}</StyledTableCell>
              <StyledTableCell align="right">{user.userType}</StyledTableCell>
              <StyledTableCell align="right"><IconButton size='large' onClick={() => handleDeleteUser(user._id, user.name)}><DeleteIcon sx={{ fontSize: 30 }}/></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminHome