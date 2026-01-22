import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(5px)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 800,
    background: 'linear-gradient(45deg, #2ecc71, #1abc9c)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    textDecoration: 'none',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#34495e',
    fontWeight: 600,
    fontSize: '1rem',
    position: 'relative',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#2ecc71',
    },
  },
  activeLink: {
    color: '#2ecc71',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      left: 0,
      width: '100%',
      height: '3px',
      background: '#2ecc71',
      borderRadius: '2px',
    },
  },
  ctaButton: {
    background: '#2ecc71',
    color: 'white',
    borderRadius: '50px',
    padding: '8px 24px',
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
      background: '#27ae60',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? classes.activeLink : '';

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar} disableGutters>
          <Link to="/" className={classes.title}>
            <span style={{ fontSize: '2rem' }}>🍅</span> Tomato Doctor
          </Link>
          <div className={classes.navLinks}>
            <Link to="/" className={`${classes.link} ${isActive('/')}`}>Home</Link>
            <Link to="/about" className={`${classes.link} ${isActive('/about')}`}>About</Link>
            <Link to="/how-it-works" className={`${classes.link} ${isActive('/how-it-works')}`}>How It Works</Link>
            <Link to="/contact" className={`${classes.link} ${isActive('/contact')}`}>Contact</Link>
            <Button component={Link} to="/detect" variant="contained" className={classes.ctaButton}>
              Detect Disease
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
