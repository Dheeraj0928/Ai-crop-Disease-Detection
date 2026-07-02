import React, { useState } from 'react';
import {
  AppBar, Toolbar, Button, Container, IconButton, Drawer,
  List, ListItem, ListItemText, Hidden, makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useLocation } from 'react-router-dom';
import { tokens } from '../theme';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Contact', path: '/contact' },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${tokens.colors.border}`,
    boxShadow: tokens.shadow.sm,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 64,
    gap: 16,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: tokens.colors.textPrimary,
    fontWeight: 800,
    fontSize: '1.15rem',
    letterSpacing: '-0.02em',
    '&:hover': { color: tokens.colors.primary },
  },
  brandIcon: {
    fontSize: '1.75rem',
    lineHeight: 1,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  link: {
    textDecoration: 'none',
    color: tokens.colors.textSecondary,
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '8px 14px',
    borderRadius: tokens.radius.pill,
    minHeight: 44,
    display: 'inline-flex',
    alignItems: 'center',
    transition: `color ${tokens.transition}, background ${tokens.transition}`,
    '&:hover': {
      color: tokens.colors.primary,
      background: tokens.colors.primaryLight,
    },
  },
  activeLink: {
    color: tokens.colors.primary,
    background: tokens.colors.primaryLight,
  },
  drawerPaper: {
    width: 280,
    padding: 16,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  drawerLink: {
    borderRadius: tokens.radius.md,
    marginBottom: 4,
    '&.Mui-selected': {
      background: tokens.colors.primaryLight,
      color: tokens.colors.primary,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLink = (item, onClick) => (
    <Link
      key={item.path}
      to={item.path}
      className={`${classes.link} ${isActive(item.path) ? classes.activeLink : ''}`}
      aria-current={isActive(item.path) ? 'page' : undefined}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );

  const drawer = (
    <nav aria-label="Mobile navigation">
      <div className={classes.drawerHeader}>
        <Link to="/" className={classes.brand} onClick={() => setMobileOpen(false)}>
          <span className={classes.brandIcon} aria-hidden="true">🌿</span> CropGuard AI
        </Link>
        <IconButton aria-label="Close menu" onClick={() => setMobileOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <List component="div">
        {NAV.map((item) => (
          <ListItem
            key={item.path}
            button
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            className={classes.drawerLink}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem style={{ marginTop: 16 }}>
          <Button
            component={Link}
            to="/detect"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setMobileOpen(false)}
          >
            Detect Disease
          </Button>
        </ListItem>
      </List>
    </nav>
  );

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0} component="header">
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar} disableGutters>
          <Link to="/" className={classes.brand} aria-label="CropGuard AI home">
            <span className={classes.brandIcon} aria-hidden="true">🌿</span>
            CropGuard AI
          </Link>

          <Hidden mdUp>
            <IconButton
              edge="end"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Hidden smDown>
            <nav className={classes.navLinks} aria-label="Main navigation">
              {NAV.map((item) => navLink(item))}
              <Button component={Link} to="/detect" variant="contained" color="primary">
                Detect Disease
              </Button>
            </nav>
          </Hidden>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
