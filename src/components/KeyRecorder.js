// =====================================
// Composant d'enregistrement de raccourcis clavier (KeyRecorder)
// Permet à l'utilisateur d'enregistrer une combinaison de touches et d'associer une action
// =====================================

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useLanguage } from '../contexts/LanguageContext';
import MouseIcon from '@mui/icons-material/Mouse';

// =============================
// Définition du composant principal
// =============================
function KeyRecorder({ onAddHotkey }) {
  // Gestion de la langue
  const { t } = useLanguage();
  // États pour la gestion de l'enregistrement et des champs du formulaire
  const [isRecording, setIsRecording] = useState(false); // Enregistrement en cours ?
  const [recordedKeys, setRecordedKeys] = useState([]); // Touches enregistrées
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false); // Dialogue d'action ouvert ?
  const [selectedAction, setSelectedAction] = useState(''); // Action sélectionnée
  const [actionPath, setActionPath] = useState(''); // Chemin ou paramètre de l'action
  const [replacementText, setReplacementText] = useState(''); // Texte de remplacement
  const [textToReplace, setTextToReplace] = useState(''); // Texte à remplacer
  const [hotkeyName, setHotkeyName] = useState(''); // Nom de la macro

  // Actions nécessitant un chemin/paramètre
  const pathRequiredActions = ['openApp', 'openWebsite'];

  // =============================
  // Effet pour enregistrer les touches clavier
  // =============================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isRecording) return;
      // Empêche le comportement par défaut du navigateur
      e.preventDefault();
      const key = e.key.toUpperCase();
      const modifiers = [];
      // Ajout des modificateurs
      if (e.ctrlKey && key !== 'CONTROL') modifiers.push('Ctrl');
      if (e.altKey && key !== 'ALT') modifiers.push('Alt');
      if (e.shiftKey && key !== 'SHIFT') modifiers.push('Shift');
      if (e.metaKey && key !== 'META') modifiers.push('Win');
      // Affichage de la touche pressée
      const displayKey = key === 'CONTROL' || key === 'ALT' || key === 'SHIFT' || key === 'META' 
        ? key 
        : `${key} (${e.code})`;
      setRecordedKeys([...modifiers, displayKey]);
    };
    // Ajout/suppression de l'écouteur d'événement
    if (isRecording) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording]);

  // =============================
  // Démarrer l'enregistrement
  // =============================
  const handleStartRecording = () => {
    setIsRecording(true);
  };

  // =============================
  // Arrêter l'enregistrement
  // =============================
  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordedKeys.length > 0) {
      setIsActionDialogOpen(true);
    }
  };

  // =============================
  // Sauvegarder la macro créée
  // =============================
  const handleSaveHotkey = () => {
    let hotkey;
    // Cas remplacement de texte
    if (selectedAction === 'replaceText') {
      if (!textToReplace || !replacementText) return;
      hotkey = {
        name: hotkeyName,
        keys: recordedKeys,
        action: {
          type: selectedAction,
          path: textToReplace,
          replacement: replacementText
        }
      };
    } else {
      if (recordedKeys.length === 0) return;
      hotkey = {
        name: hotkeyName,
        keys: recordedKeys,
        action: {
          type: selectedAction,
          path: pathRequiredActions.includes(selectedAction) ? actionPath : ''
        }
      };
    }
    // Ajout de la macro à la liste
    onAddHotkey(hotkey);
    // Réinitialisation des champs
    setIsActionDialogOpen(false);
    setSelectedAction('');
    setActionPath('');
    setReplacementText('');
    setTextToReplace('');
    setHotkeyName('');
    setRecordedKeys([]);
  };

  // =============================
  // Rendu du formulaire d'enregistrement de macro
  // =============================
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Sélection du type d'action */}
        <FormControl fullWidth>
          <InputLabel>{t('actionType')}</InputLabel>
          <Select
            value={selectedAction}
            onChange={(e) => {
              setSelectedAction(e.target.value);
              if (e.target.value === 'replaceText') {
                setIsActionDialogOpen(true);
              }
            }}
            label={t('actionType')}
          >
            <MenuItem value="openApp">{t('actionTypes.openApp')}</MenuItem>
            <MenuItem value="openWebsite">{t('actionTypes.openWebsite')}</MenuItem>
            <MenuItem value="replaceText">{t('actionTypes.replaceText')}</MenuItem>
            <MenuItem value="volumeUp">{t('actionTypes.volumeUp')}</MenuItem>
            <MenuItem value="volumeDown">{t('actionTypes.volumeDown')}</MenuItem>
            <MenuItem value="brightnessUp">{t('actionTypes.brightnessUp')}</MenuItem>
            <MenuItem value="brightnessDown">{t('actionTypes.brightnessDown')}</MenuItem>
            <MenuItem value="quickNote">{t('actionTypes.quickNote')}</MenuItem>
            <MenuItem value="startTimer">{t('actionTypes.startTimer')}</MenuItem>
            <MenuItem value="clipboardHistory">{t('actionTypes.clipboardHistory')}</MenuItem>
            <MenuItem value="aiMenu">{t('actionTypes.aiMenu')}</MenuItem>
          </Select>
        </FormControl>

        {/* Bloc d'enregistrement des touches */}
        {selectedAction && (
          <Box sx={{ textAlign: 'center' }}>
            {isRecording ? (
              <Box sx={{ 
                p: 3, 
                border: '2px solid',
                borderColor: 'error.main',
                borderRadius: 2,
                bgcolor: 'error.lighter',
                animation: 'pulse 2s infinite'
              }}>
                <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                  {t('pressKeys')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {t('tooltips.recordKeys')}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {t('tooltips.stopRecording')}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleStopRecording}
                  startIcon={<StopIcon />}
                  sx={{ 
                    minWidth: 200,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  {t('saveKey')}
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStartRecording}
                  startIcon={<PlayArrowIcon />}
                  sx={{ 
                    minWidth: 200,
                    mb: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  {t('recordedKeys')}
                </Button>
                <Typography variant="body2" color="textSecondary">
                  {t('tooltips.recordKeys')}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Affichage des touches enregistrées */}
        {recordedKeys.length > 0 && selectedAction !== 'replaceText' && (
          <Paper 
            sx={{ 
              p: 2, 
              bgcolor: 'primary.lighter',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.light'
            }}
          >
            <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
              {t('recordedKeys')}: {recordedKeys.join(' + ')}
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Dialogue de configuration de l'action */}
      <Dialog 
        open={isActionDialogOpen} 
        onClose={() => setIsActionDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('addMacro')}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label={t('macroName')}
              fullWidth
              value={hotkeyName}
              onChange={(e) => setHotkeyName(e.target.value)}
              placeholder={t('macroNamePlaceholder')}
            />
            {/* Champs spécifiques selon l'action choisie */}
            {selectedAction === 'replaceText' ? (
              <>
                <TextField
                  label={t('textToReplace')}
                  fullWidth
                  value={textToReplace}
                  onChange={(e) => setTextToReplace(e.target.value)}
                  placeholder={t('textToReplacePlaceholder')}
                />
                <TextField
                  label={t('replacement')}
                  fullWidth
                  value={replacementText}
                  onChange={(e) => setReplacementText(e.target.value)}
                  placeholder={t('replacementPlaceholder')}
                  multiline
                  rows={4}
                />
              </>
            ) : pathRequiredActions.includes(selectedAction) ? (
              <TextField
                label={selectedAction === 'openWebsite' ? 'URL' : t('path')}
                fullWidth
                value={actionPath}
                onChange={(e) => setActionPath(e.target.value)}
                placeholder={t('pathPlaceholder')}
              />
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsActionDialogOpen(false)}>
            {t('cancel')}
          </Button>
          <Button 
            onClick={handleSaveHotkey} 
            variant="contained"
            disabled={!hotkeyName || (selectedAction === 'replaceText' ? 
              (!textToReplace || !replacementText) : 
              (pathRequiredActions.includes(selectedAction) ? !actionPath : false))}
          >
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default KeyRecorder; 