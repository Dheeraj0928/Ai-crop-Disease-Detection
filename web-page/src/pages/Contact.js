import React, { useState } from 'react';
import {
  Typography, TextField, Button, Paper, Snackbar, makeStyles,
} from '@material-ui/core';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { tokens } from '../theme';

const useStyles = makeStyles(() => ({
  paper: {
    padding: tokens.spacing.card,
    borderRadius: tokens.radius.xl,
    maxWidth: 560,
    margin: '0 auto',
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: tokens.shadow.md,
  },
  field: { marginBottom: 20 },
  hint: {
    textAlign: 'center',
    color: tokens.colors.textMuted,
    fontSize: '0.875rem',
    marginTop: 16,
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <PageLayout maxWidth="md" id="main-content">
      <PageHeader
        title="Contact Us"
        subtitle="Questions, feedback, or collaboration — we'd love to hear from you."
      />

      <Paper className={classes.paper} component="form" elevation={0} onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          className={classes.field}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
          inputProps={{ 'aria-required': true }}
        />
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          className={classes.field}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
          inputProps={{ 'aria-required': true }}
        />
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          className={classes.field}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          error={!!errors.message}
          helperText={errors.message}
          inputProps={{ 'aria-required': true }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Send Message
        </Button>
        <Typography className={classes.hint}>
          Or email directly: dk.2.yadav28@gmail.com
        </Typography>
      </Paper>

      <Snackbar
        open={sent}
        autoHideDuration={5000}
        onClose={() => setSent(false)}
        message="Message received! We'll get back to you soon."
        ContentProps={{ role: 'status', 'aria-live': 'polite' }}
      />
    </PageLayout>
  );
};

export default Contact;
