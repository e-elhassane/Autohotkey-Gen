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
} from '@mui/material';
import KeyRecorder from './components/KeyRecorder';
import MacroList from './components/MacroList';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import LanguageIcon from '@mui/icons-material/Language';

function AppContent() {
  const { t, currentLanguage, setCurrentLanguage } = useLanguage();
  const [hotkeys, setHotkeys] = useState(() => {
    const saved = localStorage.getItem('ahk-hotkeys');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddHotkey = (hotkey) => {
    setHotkeys([...hotkeys, hotkey]);
  };

  const handleDeleteHotkey = (index) => {
    const newHotkeys = hotkeys.filter((_, i) => i !== index);
    setHotkeys(newHotkeys);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('title')}
          </Typography>
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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('title')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {t('subtitle')}
          </Typography>
        </Box>
        <KeyRecorder onAddHotkey={handleAddHotkey} />
        <Box sx={{ mt: 4 }}>
          <MacroList
            hotkeys={hotkeys}
            onDeleteHotkey={handleDeleteHotkey}
          />
        </Box>
      </Container>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CssBaseline />
      <AppContent />
    </LanguageProvider>
  );
}

export default App; 