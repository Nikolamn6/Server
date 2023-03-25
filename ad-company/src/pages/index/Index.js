import React, { useContext } from 'react'
import { MenuContext } from '../../contexts/MenuContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



function Index() {
  window.localStorage.setItem("menuType", false);
  const { menu, setMenu } = useContext(MenuContext);
  setMenu("false");
  return (
    <Box sx={{ width: '60%', marginTop:'10%', marginLeft:'20%', textAlign:'justify', justifyContent: 'center' }}>
      <Box>
      <Typography variant="h4">How my app can help you?</Typography>
      <Typography variant='p'>The answer to this question is easy! The app is suitable for all types of online businesses, from small to large. Here you can find answers to the most talked about technology questions, as well as access the hottest topics in online commerce. It is also quite suitable for promoting and growing start-ups and facilitating the work of already established companies.</Typography>
      </Box>
      <img style={{marginTop: '20px'}} src='https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' width="60%"/>
      {/* <Box sx={{ width: '60%', marginTop:'10%', marginLeft:'20%', textAlign:'justify', justifyContent: 'center' }}>
        <Typography variant="h4">Some of the best offers</Typography>

      </Box> */}
    </Box>
  )
}

export default Index 