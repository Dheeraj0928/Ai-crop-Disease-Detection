import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { tokens } from '../theme';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: tokens.spacing.cardMobile,
    background: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    boxShadow: tokens.shadow.md,
    border: `1px solid ${tokens.colors.border}`,
    textAlign: 'center',
    height: '100%',
    transition: `transform ${tokens.transition}, box-shadow ${tokens.transition}`,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadow.lg,
    },
    [theme.breakpoints.up('md')]: {
      padding: tokens.spacing.card,
    },
  },
  icon: {
    fontSize: '2.75rem',
    marginBottom: 16,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: tokens.radius.lg,
    background: tokens.colors.primaryLight,
  },
  title: {
    fontWeight: 700,
    color: tokens.colors.textPrimary,
    marginBottom: 8,
  },
  body: {
    color: tokens.colors.textSecondary,
    lineHeight: 1.65,
  },
}));

const FeatureCard = ({ icon, title, description }) => {
  const classes = useStyles();
  return (
    <article className={classes.card}>
      <span className={classes.icon} role="img" aria-hidden="true">{icon}</span>
      <Typography variant="h6" component="h3" className={classes.title}>{title}</Typography>
      <Typography variant="body2" className={classes.body}>{description}</Typography>
    </article>
  );
};

export default FeatureCard;
