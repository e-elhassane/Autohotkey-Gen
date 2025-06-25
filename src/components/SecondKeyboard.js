// =====================================
// Composant SecondKeyboard
// Affiche un guide pour configurer un second clavier avec HID Remapper
// =====================================

import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Keyboard,
  Link,
  Info,
  CheckCircle,
  Warning,
  Download,
  Settings,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

// =============================
// Composant principal SecondKeyboard
// =============================
function SecondKeyboard() {
  // Gestion de la langue
  const { t } = useLanguage();

  // =============================
  // Définition des étapes du guide (traductions dynamiques)
  // =============================
  const steps = [
    {
      icon: <Download />,
      title: t('secondKeyboard.steps.step1.title'),
      description: t('secondKeyboard.steps.step1.description'),
      link: 'https://www.remapper.org/',
      linkText: t('secondKeyboard.steps.step1.linkText')
    },
    {
      icon: <Settings />,
      title: t('secondKeyboard.steps.step2.title'),
      description: t('secondKeyboard.steps.step2.description'),
      link: 'https://www.remapper.org/docs/flashing/',
      linkText: t('secondKeyboard.steps.step2.linkText')
    },
    {
      icon: <Keyboard />,
      title: t('secondKeyboard.steps.step3.title'),
      description: t('secondKeyboard.steps.step3.description'),
      link: 'https://www.remapper.org/config/',
      linkText: t('secondKeyboard.steps.step3.linkText')
    },
    {
      icon: <CheckCircle />,
      title: t('secondKeyboard.steps.step4.title'),
      description: t('secondKeyboard.steps.step4.description')
    }
  ];

  // Conseils et notes (traduits)
  const tips = t('secondKeyboard.tips');
  const notes = t('secondKeyboard.notes');

  // =============================
  // Ouvre le lien de configuration HID Remapper dans un nouvel onglet
  // =============================
  const handleOpenConfig = () => {
    window.open('https://www.remapper.org/config/', '_blank');
  };

  // =============================
  // Rendu du guide de configuration du second clavier
  // =============================
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        {/* En-tête et bouton d'accès rapide à la config */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Keyboard sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            {t('secondKeyboard.title')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            {t('secondKeyboard.subtitle')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Link />}
            onClick={handleOpenConfig}
            sx={{ 
              mb: 3,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {t('secondKeyboard.openConfig')}
          </Button>
        </Box>

        {/* Bloc d'information sur HID Remapper */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body1">
            <strong>{t('secondKeyboard.whatIsHID')}</strong> {t('secondKeyboard.whatIsHIDDesc')}
          </Typography>
        </Alert>

        {/* Liste des étapes du guide */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          {t('secondKeyboard.setupGuide')}
        </Typography>
        <List sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ py: 2 }}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {step.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="h3">
                      {step.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {step.description}
                      </Typography>
                      {step.link && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Link />}
                          onClick={() => window.open(step.link, '_blank')}
                          sx={{ mt: 1 }}
                        >
                          {step.linkText}
                        </Button>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < steps.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* Conseils pratiques */}
        <Card sx={{ mb: 4, bgcolor: 'success.lighter' }}>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
              {t('secondKeyboard.proTips')}
            </Typography>
            <List dense>
              {tips.map((tip, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Notes importantes */}
        <Card sx={{ bgcolor: 'warning.lighter' }}>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ mr: 1, color: 'warning.main' }} />
              {t('secondKeyboard.importantNotes')}
            </Typography>
            {notes.map((note, index) => (
              <Typography key={index} variant="body2" paragraph>
                • {note}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}

export default SecondKeyboard; 