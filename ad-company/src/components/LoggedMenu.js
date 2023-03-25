import React, { useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WebIcon from '@mui/icons-material/Web';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import CategoryIcon from '@mui/icons-material/Category';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import HomeIcon from '@mui/icons-material/Home';
import LoggedMenuSource from './LoggedMenuSource';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { Stack, Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Blog from '../pages/Blog/Blog';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function LoggedMenu() {
    let navigate = useNavigate();
    
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userData, setUserData] = React.useState([]);

    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
      fetch('http://localhost:9000/userData', {
          method: 'POST',
          crossDomain: true,
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({token: window.localStorage.getItem("token")})
        })
        .then((res) => { return res.json(); })
        .then((data) => {
          if(data.data === "token expired"){
            window.localStorage.clear();
            navigate("/SignIn", {replace: true});
          }
          //console.log(data.data);
          setUserData(data.data);
        })
  }, [navigate])
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleLogOut = () => {
        window.localStorage.clear();
        navigate("/SignIn", {replace: true});
    }

    const handleRedirectProfile = () => {
        navigate("/Profile", {replace: true});
        setAnchorEl(null);
        setOpen(false);
    }

    const handleAddService = () => {
        navigate("/AddService", {replace: true});
        setAnchorEl(null);
        setOpen(false);
    }

    const handleAddBlog = () => {
      navigate("/AddBlog", {replace: true});
      setAnchorEl(null);
      setOpen(false);
  }


    const handleRedirectMyPosts = () => {
      navigate("/MyPosts", {replace: true});
      setAnchorEl(null);
      setOpen(false);
  }

  const handleRedirectCategotyes = () => {
    navigate("/Categotyes", {replace: true});
    setAnchorEl(null);
    setOpen(false);
}

const handleRedirectBlog = () => {
  navigate("/Blog", {replace: true});
  setAnchorEl(null);
  setOpen(false);
}

const handleRedirectDashboard = () => {
  navigate("/Dashboard", {replace: true});
  setAnchorEl(null);
  setOpen(false);
}
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
        <MenuItem onClick={handleRedirectProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      </Menu>
    );
  

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>bGrow</Typography>
        <Stack direction='row' spacing={3}>
          {userData.userType == "Blog" ? <Button variant='contained' size='small' sx={{background: '#1e88e5'}} onClick={handleAddBlog}>Add blog</Button> : ""}
        <Button variant='contained' size='small' sx={{background: '#1e88e5'}} onClick={handleAddService}>Add service</Button>

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
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <LoggedMenuSource text="Home" icon={<HomeIcon />} open={open} onClickFun={handleRedirectDashboard}/>
        <LoggedMenuSource text="Blog" icon={<WebIcon />} open={open} onClickFun={handleRedirectBlog}/>
        <LoggedMenuSource text="Most rated" icon={<StarHalfIcon />} open={open}/>
        <LoggedMenuSource text="Categoryes" icon={<CategoryIcon />} open={open} onClickFun={handleRedirectCategotyes}/>
      </List>

      <Divider />
      <List>
        <LoggedMenuSource text="My posts" icon={<MarkAsUnreadIcon />} open={open} onClickFun={handleRedirectMyPosts}/>
        <LoggedMenuSource text="Profile" icon={<AccountCircleIcon />} open={open} onClickFun={handleRedirectProfile}/>
        <LoggedMenuSource text="Exit" icon={ <LogoutIcon />} open={open} onClickFun={handleLogOut}/>
      </List>
    </Drawer>

    {renderMenu}

  </Box>

  )
}

export default LoggedMenu