import React from 'react';
import {
  Typography, Grid, Step, StepLabel, Stepper, StepContent, Paper, Button, makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { tokens } from '../theme';

const STEPS = [
  { label: 'Upload Image', description: 'Take a clear photo of a crop leaf or upload an existing image. Ensure the affected area is visible.' },
  { label: 'Preprocessing', description: 'OpenCV resizes and normalizes the image to 256×256 RGB for the ResNet50 classifier.' },
  { label: 'AI Analysis', description: 'ResNet50 transfer learning compares leaf patterns against trained disease categories.' },
  { label: 'Get Results', description: 'Receive an instant diagnosis with a confidence score and detected disease class.' },
];

const useStyles = makeStyles((theme) => ({
  stepper: { background: 'transparent', padding: 0 },
  stepTitle: { fontWeight: 700, fontSize: '1.05rem', color: tokens.colors.textPrimary },
  stepDesc: { color: tokens.colors.textSecondary, lineHeight: 1.65, marginTop: 4 },
  visual: {
    padding: tokens.spacing.card,
    background: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: tokens.shadow.md,
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
  },
  visualIcon: {
    fontSize: '4rem',
    marginBottom: 16,
    width: 88,
    height: 88,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.xl,
    background: tokens.colors.primaryLight,
  },
  cta: { marginTop: 32, textAlign: 'center' },
}));

const HowItWorks = () => {
  const classes = useStyles();

  return (
    <PageLayout maxWidth="md" id="main-content">
      <PageHeader title="How It Works" subtitle="Four simple steps from photo to diagnosis" />

      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={7}>
          <Stepper orientation="vertical" activeStep={STEPS.length} className={classes.stepper}>
            {STEPS.map((step) => (
              <Step key={step.label} expanded completed>
                <StepLabel>
                  <Typography className={classes.stepTitle}>{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography className={classes.stepDesc}>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className={classes.visual} elevation={0}>
            <div className={classes.visualIcon} aria-hidden="true">🌿</div>
            <Typography variant="h6" style={{ fontWeight: 700, color: tokens.colors.primary }}>
              Simple &amp; Fast
            </Typography>
            <Typography variant="body2" style={{ color: tokens.colors.textSecondary, marginTop: 8, maxWidth: 260 }}>
              No account required. Upload a leaf and get results in under a second.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <div className={classes.cta}>
        <Button component={Link} to="/detect" variant="contained" color="primary" size="large">
          Try It Now
        </Button>
      </div>
    </PageLayout>
  );
};

export default HowItWorks;
