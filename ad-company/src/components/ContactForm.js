import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ContactForm() {
    //const [user, setUser] = useState([]);
    // const [databaseName, setDatabaseName] = useState("")
    // const [databaseEmail, setDatabaseEmail] = useState("")
    // const [databasePhone, setDatabasePhone] = useState("")

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    localStorage.setItem("Name", JSON.stringify(name));
    localStorage.setItem("Email", JSON.stringify(email));
    localStorage.setItem("Phone", JSON.stringify(phone));

    useEffect(() => {
        fetch('http://localhost:9000/userData', {
            method: 'POST',
            crossDomain: true,
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({token: window.localStorage.getItem("token")})
          })
          .then((res) => { return res.json(); })
          .then((data) => { console.log(data, "New Data!"); setName(data.data.name); setEmail(data.data.email); setPhone(data.data.phone);})
    }, []);

    //console.log(databaseName);
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
      }
    
      const handlePhone = (e) => {
        setPhone(e.target.value);
      }
    
      const handleName = (e) => {
        setName(e.target.value);
      }

      const handleSubmit = (e) => {
        console.log("hello");
      }

      
  return (
 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <Typography variant='h5'>Contacts</Typography>
    <Typography variant='p'>Your contacts will be visible for everyone at the post.</Typography>
    <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus onChange={handleName} value={name} />
    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleEmail} value={email} />
    <TextField margin="normal" required fullWidth name="phone" label="Phone" id="phone" autoComplete="phone" onChange={handlePhone} value={phone} />
  </Box>
  )
}

export default ContactForm