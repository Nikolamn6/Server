import React, { useState, useContext } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CopywritingCategory from '../../components/CopywritingCategory';
import FreelanceCategory from '../../components/FreelanceCategory';
import EcomCategory from '../../components/EcomCategory';
import AfiliateCategory from '../../components/AfiliateCategory';
import { MenuContext } from '../../contexts/MenuContext';
import Footer from '../../components/Footer';

const theme = createTheme();

function Categoryes() {
    const { menu, setMenu } = useContext(MenuContext);
    const [copyColor, setCopyColor] = useState("text.primary");
    const [freeColor, setFreeColor] = useState("inherit");
    const [ecomColor, setEcomColor] = useState("inherit");
    const [afiColor, setAfiColor] = useState("inherit");
    const [br, setBr] = useState(1);

    setMenu("true");
    window.localStorage.setItem("menuType", true);

    const handleCopywriting = (e) => {
        e.preventDefault();
        setCopyColor("text.primary");
        setFreeColor("inherit");
        setEcomColor("inherit");
        setAfiColor("inherit");
        setBr(1);
    }

    const handleFreelance = (e) => {
        e.preventDefault();
        setCopyColor("inherit");
        setFreeColor("text.primary");
        setEcomColor("inherit");
        setAfiColor("inherit");
        setBr(2);
    }

    const handleEcommerce = (e) => {
        e.preventDefault();
        setCopyColor("inherit");
        setFreeColor("inherit")
        setEcomColor("text.primary")
        setAfiColor("inherit")
        setBr(3);
    }

    const handleAffiliate = (e) => {
        e.preventDefault();
        setCopyColor("inherit");
        setFreeColor("inherit");
        setEcomColor("inherit");
        setAfiColor("text.primary");
        setBr(4);
    }
  return (
    <ThemeProvider theme={theme}>

<CssBaseline />
<Box component="div" sx={{marginTop: '10%', marginLeft: '37%'}}>
    <Breadcrumbs  aria-label="breadcrumb">
      <Link underline="hover" color={copyColor} onClick={handleCopywriting}>
      Copywriting
      </Link>
      <Link underline="hover" color={freeColor} onClick={handleFreelance}>
      Freelance
      </Link>
      <Link underline="hover" color={ecomColor} onClick={handleEcommerce}>
      E-commerce
      </Link>
      <Link underline="hover" color={afiColor} onClick={handleAffiliate}>
      Affiliate marketing
      </Link>
    </Breadcrumbs>
  </Box>
<main>
  <Box
    sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
    }}
  >
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {br === 1 ? "Copywriting" : ""}
        {br === 2 ? "Freelance" : ""}
        {br === 3 ? "E-commerce" : ""}
        {br === 4 ? "Affiliate marketing" : ""}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
      Here are all services uploaded by users in a category 
        {br === 1 ? " copywriting." : ""}
        {br === 2 ? " freelance." : ""}
        {br === 3 ? " E-commerce." : ""}
        {br === 4 ? " affiliate marketing." : ""}
      </Typography>

    </Container>
  </Box>
  <Container sx={{ py: 8 }} maxWidth="md">
        {br === 1 ? <CopywritingCategory/> : ""}
        {br === 2 ? <FreelanceCategory/> : ""}
        {br === 3 ? <EcomCategory/> : ""}
        {br === 4 ? <AfiliateCategory/> : ""}
  </Container>
</main>
<Footer/>
</ThemeProvider>
  )
}

export default Categoryes