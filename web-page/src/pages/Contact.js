import React from 'react';
import { Container, Typography, makeStyles, TextField, Button, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '60px 0',
  },
  title: {
    fontWeight: 800,
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  paper: {
      padding: '40px',
      borderRadius: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
  input: {
      marginBottom: '20px',
  },
  submitBtn: {
      background: '#2ecc71',
      color: 'white',
      padding: '12px 30px',
      fontWeight: 700,
      borderRadius: '50px',
      '&:hover': {
          background: '#27ae60',
      },
  }
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>Contact Us</Typography>
      <Typography variant="body1" align="center" style={{marginBottom: 40, color: '#666'}}>
          Have questions or want to collaborate? Reach out to us!
      </Typography>

      <Paper className={classes.paper}>
        <form noValidate autoComplete="off">
            <TextField 
                fullWidth 
                label="Your Name" 
                variant="outlined" 
                className={classes.input}
            />
            <TextField 
                fullWidth 
                label="Email Address" 
                variant="outlined" 
                className={classes.input}
            />
            <TextField 
                fullWidth 
                label="Message" 
                variant="outlined" 
                multiline
                rows={4}
                className={classes.input}
            />
            <Button variant="contained" className={classes.submitBtn} fullWidth>
                Send Message
            </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Contact;
