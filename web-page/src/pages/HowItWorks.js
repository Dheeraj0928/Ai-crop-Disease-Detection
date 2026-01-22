import React from 'react';
import { Container, Typography, makeStyles, Grid, Step, StepLabel, Stepper, StepContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '60px 0',
  },
  title: {
    fontWeight: 800,
    marginBottom: '40px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  stepTitle: {
      fontWeight: 700,
      fontSize: '1.2rem',
  },
  stepDesc: {
      color: '#7f8c8d',
  },
  image: {
      width: '100%',
      maxWidth: '500px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      marginTop: '20px'
  }
}));

const HowItWorks = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      label: 'Upload Image',
      description: 'Take a clear photo of the tomato leaf or upload an existing image from your device. Ensure the affected area is visible.',
    },
    {
      label: 'Preprocessing',
      description: 'The system automatically resizes and normalizes your image to match the requirements of our AI model.',
    },
    {
      label: 'AI Analysis',
      description: 'Our deep learning model scans the image patterns, comparing them against thousands of known disease markers.',
    },
    {
      label: 'Get Results',
      description: 'Receive an instant diagnosis with a confidence score and the name of the detected disease.',
    },
  ];

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>How It Works</Typography>
      
      <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stepper activeStep={4} orientation="vertical" style={{background: 'transparent'}}>
                {steps.map((step, index) => (
                <Step key={step.label} expanded>
                    <StepLabel >
                        <Typography className={classes.stepTitle}>{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                    <Typography className={classes.stepDesc}>{step.description}</Typography>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
          </Grid>
          <Grid item xs={12} md={6}>
              <div style={{
                  padding: '40px', 
                  background: 'white', 
                  borderRadius: '20px', 
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <div style={{fontSize: '6rem'}}>🍅</div>
                  <Typography variant="h6" style={{color: '#2ecc71', fontWeight: 700}}>Simple & Fast</Typography>
              </div>
          </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
