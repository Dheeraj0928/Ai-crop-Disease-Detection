import React from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { tokens } from '../theme';

const useStyles = makeStyles(() => ({
  card: {
    padding: tokens.spacing.card,
    borderRadius: tokens.radius.xl,
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: tokens.shadow.md,
  },
  section: {
    marginBottom: 32,
    '&:last-child': { marginBottom: 0 },
  },
  sectionTitle: {
    fontWeight: 700,
    color: tokens.colors.primary,
    marginBottom: 12,
  },
  body: {
    lineHeight: 1.8,
    color: tokens.colors.textSecondary,
    fontSize: '1.05rem',
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    listStyle: 'none',
    '& li': {
      padding: '10px 0',
      borderBottom: `1px solid ${tokens.colors.border}`,
      color: tokens.colors.textSecondary,
      lineHeight: 1.65,
      '&:last-child': { borderBottom: 'none' },
      '& strong': { color: tokens.colors.textPrimary },
    },
  },
}));

const SECTIONS = [
  {
    title: 'AI-Based Crop Disease Detection',
    body: 'End-to-end CNN image classification using ResNet50 transfer learning (TensorFlow/Keras). The pipeline supports any folder-based crop disease dataset, GPU-accelerated training with data augmentation, and dropout/L2 regularization for field-ready generalization.',
  },
  {
    title: 'Pipeline',
    items: [
      ['Preprocessing', 'OpenCV resize and normalize (256×256 RGB)'],
      ['Model', 'ResNet50 backbone + dense head with dropout'],
      ['Training', 'python -m ml.train --data /path/to/dataset'],
      ['Evaluation', 'python -m ml.evaluate --data /path/to/dataset'],
      ['Inference', 'python -m ml.predict --image leaf.jpg'],
      ['API', 'FastAPI REST service + React web UI'],
    ],
  },
  {
    title: 'Impact',
    body: 'Early disease detection helps reduce crop yield loss. Upload a leaf image and receive a predicted class with confidence scores in under a second.',
  },
];

const About = () => {
  const classes = useStyles();

  return (
    <PageLayout maxWidth="md" id="main-content">
      <PageHeader
        title="About The Project"
        subtitle="Production ML pipeline for crop leaf disease classification"
      />
      <Paper className={classes.card} elevation={0}>
        {SECTIONS.map((s) => (
          <section key={s.title} className={classes.section}>
            <Typography variant="h5" component="h2" className={classes.sectionTitle}>{s.title}</Typography>
            {s.body && <Typography className={classes.body}>{s.body}</Typography>}
            {s.items && (
              <ul className={classes.list}>
                {s.items.map(([k, v]) => (
                  <li key={k}><strong>{k}:</strong> {v}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </Paper>
    </PageLayout>
  );
};

export default About;
