import React from 'react';
import { Container, Typography, Grid, makeStyles, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Detect Disease', to: '/detect' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Contact', to: '/contact' },
];

const useStyles = makeStyles(() => ({
  footer: {
    background: tokens.colors.footer,
    color: tokens.colors.footerText,
    padding: '48px 0 24px',
    marginTop: 'auto',
  },
  heading: {
    fontWeight: 700,
    marginBottom: 16,
    color: '#6ee7b7',
    fontSize: '1rem',
  },
  link: {
    color: tokens.colors.footerText,
    textDecoration: 'none',
    padding: '6px 0',
    minHeight: 44,
    display: 'flex',
    alignItems: 'center',
    transition: `color ${tokens.transition}`,
    '&:hover, &:focus-visible': { color: '#ffffff' },
  },
  copy: {
    borderTop: `1px solid #334155`,
    marginTop: 32,
    paddingTop: 24,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '0.875rem',
  },
  body: { color: '#94a3b8', lineHeight: 1.7 },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="p" className={classes.heading}>CropGuard AI</Typography>
            <Typography variant="body2" className={classes.body}>
              Production-grade crop disease detection using ResNet50, OpenCV, TensorFlow, and FastAPI.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="p" className={classes.heading}>Quick Links</Typography>
            <nav aria-label="Footer navigation">
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} className={classes.link}>{l.label}</Link>
              ))}
            </nav>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="p" className={classes.heading}>Tech Stack</Typography>
            <Typography variant="body2" className={classes.body} component="ul" style={{ margin: 0, paddingLeft: 18 }}>
              <li>React.js Frontend</li>
              <li>ResNet50 / TensorFlow / Keras</li>
              <li>OpenCV Preprocessing</li>
              <li>FastAPI Backend</li>
            </Typography>
          </Grid>
        </Grid>
        <Box className={classes.copy}>
          &copy; {new Date().getFullYear()} AI-Based Crop Disease Detection
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
