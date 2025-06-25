// =============================
// Application principale React
// Gère la navigation, le contexte de langue, et l'affichage des pages principales
// =============================

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  CssBaseline,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import KeyRecorder from './components/KeyRecorder';
import MacroList from './components/MacroList';
import SecondKeyboard from './components/SecondKeyboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsIcon from '@mui/icons-material/Settings';

// =============================
// Composant principal du contenu de l'application
// =============================
function AppContent() {
  // Gestion de la langue et de la navigation
  const { t, currentLanguage, setCurrentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState('main'); // 'main' ou 'secondKeyboard'
  // Stockage des macros (hotkeys)
  const [hotkeys, setHotkeys] = useState(() => {
    const saved = localStorage.getItem('ahk-hotkeys');
    return saved ? JSON.parse(saved) : [];
  });

  // Ajout d'une nouvelle macro
  const handleAddHotkey = (hotkey) => {
    setHotkeys([...hotkeys, hotkey]);
  };

  // Suppression d'une macro
  const handleDeleteHotkey = (index) => {
    const newHotkeys = hotkeys.filter((_, i) => i !== index);
    setHotkeys(newHotkeys);
  };

  // =============================
  // Rendu de l'interface utilisateur
  // =============================
  return (
    <div className="App">
      {/* Barre d'application avec navigation et sélection de langue */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('title')}
          </Typography>
          {/* Boutons de navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <Button
              color="inherit"
              startIcon={<KeyboardIcon />}
              onClick={() => setCurrentPage('main')}
              sx={{ 
                bgcolor: currentPage === 'main' ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              {t('navigation.macroGenerator')}
            </Button>
            <Button
              color="inherit"
              startIcon={<SettingsIcon />}
              onClick={() => setCurrentPage('secondKeyboard')}
              sx={{ 
                bgcolor: currentPage === 'secondKeyboard' ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              {t('navigation.secondKeyboard')}
            </Button>
          </Box>
          {/* Sélecteur de langue */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <LanguageIcon sx={{ mr: 1, color: 'white' }} />
            <Select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              size="small"
              sx={{ 
                minWidth: 100,
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.8)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '.MuiSvgIcon-root': { color: 'white' }
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Affichage conditionnel de la page principale ou de la page second clavier */}
      {currentPage === 'main' ? (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t('title')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {t('subtitle')}
            </Typography>
          </Box>
          {/* Enregistrement des raccourcis */}
          <KeyRecorder onAddHotkey={handleAddHotkey} />
          {/* Liste des macros */}
          <Box sx={{ mt: 4 }}>
            <MacroList
              hotkeys={hotkeys}
              onDeleteHotkey={handleDeleteHotkey}
            />
          </Box>
        </Container>
      ) : (
        <SecondKeyboard />
      )}
    </div>
  );
}

// =============================
// Point d'entrée de l'application avec le provider de langue
// =============================
function App() {
  return (
    <LanguageProvider>
      <CssBaseline />
      <AppContent />
    </LanguageProvider>
  );
}

export default App; 