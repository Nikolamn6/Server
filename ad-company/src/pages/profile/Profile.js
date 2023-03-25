import React, { useEffect, useState, useContext } from 'react'
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MenuContext } from '../../contexts/MenuContext';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Footer from '../../components/Footer';


function Profile() {
    let navigate = useNavigate();
    const { menu, setMenu } = useContext(MenuContext);
    setMenu("true");

    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repNewPassword, setRepNewPassword] = useState('');
    const [errorPWD, setErrorPWD] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpenPWD = () => {
      setOpenTwo(true);
    };

    const handleClosePWD = () => {
      setOpenTwo(false);
    };
  

    window.localStorage.setItem("menuType", true);

    useEffect(() => {
      getUsers();
    }, [])

    const getUsers = () => {
      fetch('http://localhost:9000/userData', {
        method: 'POST',
        crossDomain: true,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({token: window.localStorage.getItem("token")})
      })
      .then((res) => { return res.json(); })
      .then((data) => { console.log(data, "New Data!"); setUser(data.data)})
    }

    const handleName = (e) => {
      setName(e.target.value);
    }

    const handleEmail = (e) => {
      setEmail(e.target.value);
    }

    const handlePhone = (e) => {
      setPhone(e.target.value);
    }
    const handleUptade = () => {
      const userData = { id: user._id, name, email, phone };
      //console.log(userData);

      fetch('http://localhost:9000/updateUser', {
        method: 'POST',
        crossDomain: true,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      })
      .then((res) => { return res.json(); })
      .then((data) => { 
        console.log(data, "Updated");
        setOpen(false);
        getUsers();
      })
    }


    const handleOldPWD = (e) => {
      setPassword(e.target.value);
    }

    const handleRepNewPWD = (e) => {
      setRepNewPassword(e.target.value);
    }

    const handleNewPWD = (e) => {
      setNewPassword(e.target.value);
    }

    const handleUpdatePWD = (e) => {
      const PWDData = { id: user._id, password: newPassword };

      console.log(PWDData);

      // if(password == user.password){
        fetch('http://localhost:9000/updateUserPWD', {
          method: 'POST',
          crossDomain: true,
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(PWDData)
        })
        .then((res) => { return res.json(); })
        .then((data) => { 
          console.log(data, "Updated");
          setOpenTwo(false);
          getUsers();
        })
      // }else{console.log("PWDS not matching")}


    }

  return (
    <div>
    <Box sx={{ marginTop: '10%', width: '40%', marginLeft: "30%", background: "#f2f2f2", padding: "100px"}}> 
    <Typography variant='h2'>Profile</Typography>
       <p> User Name: {user.name}</p>
       <p> User Email: {user.email}</p>
       <p> User phone: {user.phone}</p>
       <p> User role: {user.userType}</p>

       <Button variant="contained" onClick={handleClickOpen}>Update profile</Button>
       <Button variant="text" sx={{marginLeft: "20px"}} onClick={handleClickOpenPWD}>Update password</Button>

       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update profile, enter correct values!
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            placeholder = {user.name}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleName}
          />
            <TextField
            autoFocus
            margin="normal"
            id="email"
            label="Email"
            placeholder={user.email}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleEmail}
          />
                    <TextField
            autoFocus
            margin="normal"
            id="phone"
            label="Phone"
            placeholder = {user.phone}
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePhone}
          />
                    <TextField
            autoFocus
            margin="normal"
            id="role"
            label={`User role: ${user.userType}`}
            type="text"
            fullWidth
            variant="standard"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUptade}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTwo} onClose={handleClosePWD}>
        <DialogTitle>Update password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update password, enter correct values!
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="oldPass"
            label="Old Password..."
            type="password"
            fullWidth
            variant="standard"
            onChange={handleOldPWD}
          />
            <TextField
            autoFocus
            margin="normal"
            id="newPass"
            label="New password..."
            type="password"
            fullWidth
            variant="standard"
            onChange={handleNewPWD}
          />
                      <TextField
            autoFocus
            margin="normal"
            id="neqPassRep"
            label="Repeat new password..."
            type="password"
            fullWidth
            variant="standard"
            onChange={handleRepNewPWD}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePWD}>Cancel</Button>
          <Button onClick={handleUpdatePWD}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
    {/* <Footer /> */}
    </div>
  )
}

export default Profile