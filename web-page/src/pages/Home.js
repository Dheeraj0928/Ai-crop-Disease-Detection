import React from 'react';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import FeatureCard from '../components/FeatureCard';
import { tokens } from '../theme';

const useStyles = makeStyles((theme) => ({
  hero: {
    textAlign: 'center',
    padding: `${tokens.spacing.section}px ${tokens.spacing.cardMobile}px`,
    background: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: tokens.shadow.lg,
    marginBottom: tokens.spacing.section,
    [theme.breakpoints.down('sm')]: {
      padding: `${tokens.spacing.card * 1.5}px ${tokens.spacing.cardMobile}px`,
    },
  },
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: tokens.radius.pill,
    background: tokens.colors.primaryLight,
    color: tokens.colors.primaryDark,
    fontWeight: 600,
    fontSize: '0.85rem',
    marginBottom: 20,
  },
  heroTitle: {
    fontWeight: 800,
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    color: tokens.colors.textPrimary,
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: tokens.colors.textSecondary,
    maxWidth: 640,
    margin: '0 auto 32px',
    lineHeight: 1.7,
  },
  ctaRow: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  secondaryBtn: {
    borderColor: tokens.colors.border,
    color: tokens.colors.textPrimary,
    minHeight: 48,
    padding: '12px 28px',
    borderRadius: tokens.radius.pill,
    fontWeight: 600,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 700,
    color: tokens.colors.textPrimary,
    marginBottom: 32,
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
    flexWrap: 'wrap',
    marginTop: 40,
    paddingTop: 32,
    borderTop: `1px solid ${tokens.colors.border}`,
  },
  stat: { textAlign: 'center' },
  statValue: { fontWeight: 800, fontSize: '1.75rem', color: tokens.colors.primary },
  statLabel: { fontSize: '0.875rem', color: tokens.colors.textSecondary, marginTop: 4 },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <PageLayout id="main-content">
      <section className={`${classes.hero} fade-in`} aria-labelledby="hero-title">
        <span className={classes.badge}>ResNet50 · OpenCV · FastAPI</span>
        <Typography id="hero-title" variant="h1" className={classes.heroTitle}>
          AI-Powered Crop Disease Detection
        </Typography>
        <Typography variant="body1" className={classes.heroSubtitle}>
          Upload a leaf photo and get an instant diagnosis with confidence scores —
          built for farmers, agronomists, and researchers.
        </Typography>
        <div className={classes.ctaRow}>
          <Button component={Link} to="/detect" variant="contained" color="primary" size="large">
            Analyze Plant Now
          </Button>
          <Button component={Link} to="/how-it-works" variant="outlined" className={classes.secondaryBtn} size="large">
            See How It Works
          </Button>
        </div>
        <div className={classes.stats} role="list">
          <div className={classes.stat} role="listitem">
            <div className={classes.statValue}>92%+</div>
            <div className={classes.statLabel}>Validation accuracy</div>
          </div>
          <div className={classes.stat} role="listitem">
            <div className={classes.statValue}>&lt;1s</div>
            <div className={classes.statLabel}>Inference time</div>
          </div>
          <div className={classes.stat} role="listitem">
            <div className={classes.statValue}>15k+</div>
            <div className={classes.statLabel}>Training images</div>
          </div>
        </div>
      </section>

      <Typography variant="h4" component="h2" className={classes.sectionTitle}>
        Why CropGuard AI
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon="⚡"
            title="Instant Results"
            description="Optimized API delivers diagnosis in seconds — no queues, no waiting."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon="🎯"
            title="92% Accuracy"
            description="ResNet50 transfer learning with augmentation, dropout, and L2 regularization."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon="📱"
            title="Works Everywhere"
            description="Responsive design with drag-and-drop upload — desktop, tablet, and mobile."
          />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Home;
