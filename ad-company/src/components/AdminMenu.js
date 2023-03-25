import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material' 
import CatchingPokemon from '@mui/icons-material/CatchingPokemon'
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';


function AdminMenu() {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRedirectUsers = (e) => {
    e.preventDefault();
    navigate("/Admin", {replace: true});
  }

  const handleRedirectBlogs = (e) => {
    e.preventDefault();
    navigate("/AdminBlogs", {replace: true});
  }

  const handleRedirectPosts = (e) => {
    e.preventDefault();
    navigate("/AdminPosts", {replace: true});
  }


  const handleLogOut = () => {
    window.localStorage.clear();
    navigate("/SignIn", {replace: true});

}

const hangleRedirectProfile = () => {
    navigate("/AdminProfile", {replace: true});
    setAnchorEl(null);
}

const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={hangleRedirectProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <CatchingPokemon sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant='h4' component='div' sx={{ flexGrow: 1, cursor: 'pointer' }}>bGrow</Typography>
                <Stack direction='row' spacing={2}>
                  <Button variant='text' color='inherit' size='large' onClick={handleRedirectUsers}>Users</Button>
                  <Button variant='text' color='inherit' size='large' onClick={handleRedirectBlogs}>Blogs</Button>
                  <Button variant='text' color='inherit' size='large' onClick={handleRedirectPosts}>Posts</Button>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>

                </Stack>

            </Toolbar>
            {renderMenu}
        </AppBar>
  )
}

export default AdminMenu

