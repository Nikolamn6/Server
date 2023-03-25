import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function LoggedMenuSource(props) {
  return (
    <ListItem disablePadding sx={{ display: 'block' }} onClick={props.onClickFun}>
    <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? 'initial' : 'center', px: 2.5 }}>
    <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : 'auto', justifyContent: 'center' }}> {props.icon} </ListItemIcon>
    <ListItemText primary={props.text} sx={{ opacity: props.open ? 1 : 0 }} />
    </ListItemButton>
    </ListItem>
  )
}

export default LoggedMenuSource