import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { tokens } from '../theme';

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
    paddingTop: tokens.spacing.pageYMobile,
    paddingBottom: tokens.spacing.pageYMobile,
    [theme.breakpoints.up('md')]: {
      paddingTop: tokens.spacing.pageY,
      paddingBottom: tokens.spacing.pageY,
    },
  },
}));

const PageLayout = ({ children, maxWidth = 'lg', id }) => {
  const classes = useStyles();
  return (
    <main id={id} className={classes.main} tabIndex={-1}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </main>
  );
};

export default PageLayout;
