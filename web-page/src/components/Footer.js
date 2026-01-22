import React from 'react';
import { Container, Typography, Grid, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: '#2c3e50',
    color: '#ecf0f1',
    padding: '40px 0 20px',
    marginTop: 'auto',
  },
  heading: {
    fontWeight: 700,
    marginBottom: '10px',
    color: '#2ecc71',
  },
  link: {
    display: 'block',
    color: '#bdc3c7',
    textDecoration: 'none',
    marginBottom: '5px',
    '&:hover': {
      color: 'white',
    },
  },
  copy: {
    borderTop: '1px solid #34495e',
    marginTop: '20px',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '0.9rem',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.heading}>Tomato Doctor</Typography>
            <Typography variant="body2" style={{ color: '#bdc3c7' }}>
              Advanced AI-powered tool for detecting tomato plant diseases instantly. Helping farmers saving crop and increase yield.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.heading}>Quick Links</Typography>
            <a href="/" className={classes.link}>Home</a>
            <a href="/detect" className={classes.link}>Detect Disease</a>
            <a href="/about" className={classes.link}>About</a>
            <a href="/contact" className={classes.link}>Contact</a>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.heading}>Tech Stack</Typography>
            <Typography variant="body2" style={{ color: '#bdc3c7' }}>
              • React.js Frontend<br />
              • TensorFlow / CNN Model<br />
              • FastAPI Backend<br />
              • Google Cloud Platform
            </Typography>
          </Grid>
        </Grid>
        <Box className={classes.copy}>
          &copy; {new Date().getFullYear()} Tomato Disease Detection. Research Project.
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
