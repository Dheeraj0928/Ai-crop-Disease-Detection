import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { tokens } from '../theme';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    marginBottom: tokens.spacing.card,
    maxWidth: 720,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontWeight: 800,
    color: tokens.colors.textPrimary,
    marginBottom: 12,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: tokens.colors.textSecondary,
    lineHeight: 1.7,
    fontSize: '1.05rem',
  },
}));

const PageHeader = ({ title, subtitle, titleComponent = 'h1' }) => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <Typography variant="h3" component={titleComponent} className={classes.title}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
    </header>
  );
};

export default PageHeader;
