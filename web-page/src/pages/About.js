import React from 'react';
import { Container, Typography, makeStyles, Grid, Paper } from '@material-ui/core';

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
  section: {
    marginBottom: '40px',
  },
  card: {
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  }
}));

const About = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>About The Project</Typography>
      
      <Paper className={classes.card}>
        <div className={classes.section}>
            <Typography variant="h5" gutterBottom style={{fontWeight: 700, color: '#27ae60'}}>Why Tomato Disease Detection?</Typography>
            <Typography variant="body1" paragraph style={{lineHeight: 1.8, fontSize: '1.1rem', color: '#555'}}>
                Tomato crops are vital for global food security, but they are highly susceptible to diseases like Bacterial Spot, Early Blight, and Late Blight. 
                Early detection is crucial to prevent spread and minimize crop loss. Traditional manual diagnosis is time-consuming and requires expert knowledge that many farmers lack.
            </Typography>
        </div>

        <div className={classes.section}>
            <Typography variant="h5" gutterBottom style={{fontWeight: 700, color: '#27ae60'}}>How AI Helps</Typography>
            <Typography variant="body1" paragraph style={{lineHeight: 1.8, fontSize: '1.1rem', color: '#555'}}>
                This project allows the power of Deep Learning to solve this agricultural problem. By using a Convolutional Neural Network (CNN) trained on thousands of images of both healthy and diseased tomato leaves, our system can identify diseases with high accuracy in milliseconds.
            </Typography>
        </div>

        <div className={classes.section}>
            <Typography variant="h5" gutterBottom style={{fontWeight: 700, color: '#27ae60'}}>Technical Architecture</Typography>
            <Typography variant="body1" paragraph style={{lineHeight: 1.8, fontSize: '1.1rem', color: '#555'}}>
                • <b>Frontend:</b> React.js for a responsive and interactive user interface.<br/>
                • <b>Backend:</b> FastAPI for high-performance model serving.<br/>
                • <b>AI Model:</b> TensorFlow/Keras CNN model tailored for visual recognition tasks.<br/>
                • <b>Deployment:</b> Designed for cloud scalability using Google Cloud Platform (GCP).
            </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default About;
