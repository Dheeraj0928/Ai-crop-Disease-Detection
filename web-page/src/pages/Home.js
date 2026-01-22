import React from 'react';
import { Container, Typography, Button, makeStyles, Grid, CardDisplay } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  hero: {
    padding: '100px 0',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 1)',
    borderRadius: '30px',
    margin: '20px auto',
    maxWidth: '1200px',
  },
  heroTitle: {
    fontWeight: 900,
    fontSize: '3.5rem',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #4368a0ff, #2fbe66ff)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '40px',
    maxWidth: '700px',
    margin: '0 auto 40px',
  },
  features: {
    padding: '80px 0',
  },
  featureCard: {
    padding: '30px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
    },
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '20px',
    display: 'block',
  },
  ctaButton: {
    background: '#2ecc71',
    color: 'white',
    padding: '15px 50px',
    fontSize: '1.2rem',
    borderRadius: '50px',
    fontWeight: 700,
    textTransform: 'none',
    boxShadow: '0 10px 20px rgba(46, 204, 113, 0.3)',
    '&:hover': {
      background: '#27ae60',
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.hero}>
        <Typography variant="h1" className={classes.heroTitle}>
          AI-Powered Tomato Disease Detection
        </Typography>
        <Typography variant="h5" className={classes.heroSubtitle}>
          Save your crops with our advanced deep learning model. Instant diagnosis, high accuracy, and absolutely free for farmers.
        </Typography>
        <Button component={Link} to="/detect" variant="contained" className={classes.ctaButton}>
          Analyze Plant Now
        </Button>
      </div>

      <div className={classes.features}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className={classes.featureCard}>
              <span className={classes.icon}>🚀</span>
              <Typography variant="h5" style={{fontWeight:700, marginBottom:10}}>Instant Results</Typography>
              <Typography variant="body1" color="textSecondary">
                Get diagnosis in seconds using our optimized API. No waiting times.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.featureCard}>
              <span className={classes.icon}>🧠</span>
              <Typography variant="h5" style={{fontWeight:700, marginBottom:10}}>98% Accuracy</Typography>
              <Typography variant="body1" color="textSecondary">
                Powered by a Convolutional Neural Network (CNN) trained on thousands of leaf images.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.featureCard}>
              <span className={classes.icon}>📱</span>
              <Typography variant="h5" style={{fontWeight:700, marginBottom:10}}>Easy to Use</Typography>
              <Typography variant="body1" color="textSecondary">
                Simple drag-and-drop interface designed for everyone, from researchers to farmers.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;
