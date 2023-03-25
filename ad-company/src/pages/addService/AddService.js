import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContactForm from '../../components/ContactForm';
import DescriptionForm from '../../components/DescriptionForm';
import GalleryForm from '../../components/GalleryForm';
import PreviewSection from '../../components/PreviewSection';
import { MenuContext } from '../../contexts/MenuContext';
import { ImageContext } from '../../contexts/ImageContext';
import { useNavigate } from "react-router-dom";

const steps = ['Contacts', 'Description', 'Gallery', 'Preview'];

function AddService() {
  let navigate = useNavigate();

    const { menu, setMenu } = useContext(MenuContext);
    const { images, setImages } = useContext(ImageContext);
    setMenu("true");

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    useEffect(() => {
      if(activeStep > 3) {
      const name = JSON.parse(localStorage.getItem("Name"));
      const email = JSON.parse(localStorage.getItem("Email"));
      const phone = JSON.parse(localStorage.getItem("Phone"));
      const title = JSON.parse(localStorage.getItem("Title"));
      const description = JSON.parse(localStorage.getItem("Description"));
      const category = JSON.parse(localStorage.getItem("Category"));
      const price = JSON.parse(localStorage.getItem("Price"));
      const testImage = images;

    const formData = new FormData();
    formData.append('testImage', testImage);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    
    fetch('http://localhost:9000/PostService', { method: 'POST', body: formData })
    .then((res) => { return res.json(); })
   .then((data) => { console.log(data, "Added")})
  }
    }, [activeStep])

    const isStepOptional = (step) => {
      return step === -1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
        navigate("/MyPosts", {replace: true});
    };
  return (
    <Box sx={{ width: '80%', marginTop:'15%', marginLeft:'10%' }}>
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(index)) {
          labelProps.optional = (
            <Typography variant="caption">Optional</Typography>
          );
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    {activeStep === steps.length ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>View service</Button>
        </Box>
      </React.Fragment>
    ) : (
      <React.Fragment>
        { activeStep === 0 ? <ContactForm /> : ""}
        { activeStep === 1 ? <DescriptionForm /> : ""}
        { activeStep === 2 ? <GalleryForm /> : ""}
        { activeStep === 3 ? <PreviewSection /> : ""}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}

          <Button onClick={handleNext} variant='contained'>
            {activeStep === steps.length - 1 ? 'Publish' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    )}
  </Box>
  )
}

export default AddService