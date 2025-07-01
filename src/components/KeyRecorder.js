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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [workspacePaths, setWorkspacePaths] = useState(['']); // Multiple paths for workspace
  const [websiteUrls, setWebsiteUrls] = useState(['']); // Multiple URLs for websites
  const [replacementText, setReplacementText] = useState(''); // Texte de remplacement
  const [textToReplace, setTextToReplace] = useState(''); // Texte à remplacer
  const [hotkeyName, setHotkeyName] = useState(''); // Nom de la macro

  // Actions nécessitant un chemin/paramètre
  const pathRequiredActions = ['openApp', 'openWebsite', 'workspace', 'openMultipleWebsites'];

  // =============================
  // Effet pour enregistrer les touches clavier
  // =============================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isRecording) return;
      // Empêche le comportement par défaut du navigateur
      e.preventDefault();
      
      const modifiers = [];
      // Ajout des modificateurs
      if (e.ctrlKey && e.key.toUpperCase() !== 'CONTROL') modifiers.push('Ctrl');
      if (e.altKey && e.key.toUpperCase() !== 'ALT') modifiers.push('Alt');
      if (e.shiftKey && e.key.toUpperCase() !== 'SHIFT') modifiers.push('Shift');
      if (e.metaKey && e.key.toUpperCase() !== 'META') modifiers.push('Win');
      
      // Gestion spéciale pour les touches numpad
      let displayKey;
      if (e.code.startsWith('Numpad')) {
        // Pour les touches numpad, utiliser le code complet
        const numpadKey = e.code.replace('Numpad', 'NUMPAD');
        displayKey = numpadKey;
      } else if (e.key.toUpperCase() === 'CONTROL' || e.key.toUpperCase() === 'ALT' || 
                 e.key.toUpperCase() === 'SHIFT' || e.key.toUpperCase() === 'META') {
        // Pour les modificateurs, utiliser la touche
        displayKey = e.key.toUpperCase();
      } else {
        // Pour les autres touches, utiliser le format standard
        displayKey = `${e.key.toUpperCase()} (${e.code})`;
      }
      
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
  // Gestion des chemins workspace
  // =============================
  const addWorkspacePath = () => {
    setWorkspacePaths([...workspacePaths, '']);
  };

  const removeWorkspacePath = (index) => {
    const newPaths = workspacePaths.filter((_, i) => i !== index);
    setWorkspacePaths(newPaths);
  };

  const updateWorkspacePath = (index, value) => {
    const newPaths = [...workspacePaths];
    newPaths[index] = value;
    setWorkspacePaths(newPaths);
  };

  // =============================
  // Gestion des URLs de sites web
  // =============================
  const addWebsiteUrl = () => {
    setWebsiteUrls([...websiteUrls, '']);
  };

  const removeWebsiteUrl = (index) => {
    const newUrls = websiteUrls.filter((_, i) => i !== index);
    setWebsiteUrls(newUrls);
  };

  const updateWebsiteUrl = (index, value) => {
    const newUrls = [...websiteUrls];
    newUrls[index] = value;
    setWebsiteUrls(newUrls);
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
    } else if (selectedAction === 'workspace') {
      // Cas workspace avec chemins multiples
      const validPaths = workspacePaths.filter(path => path.trim() !== '');
      if (validPaths.length === 0) return;
      hotkey = {
        name: hotkeyName,
        keys: recordedKeys,
        action: {
          type: selectedAction,
          path: validPaths.join('|')
        }
      };
    } else if (selectedAction === 'openMultipleWebsites') {
      // Cas sites web multiples
      const validUrls = websiteUrls.filter(url => url.trim() !== '');
      if (validUrls.length === 0) return;
      hotkey = {
        name: hotkeyName,
        keys: recordedKeys,
        action: {
          type: selectedAction,
          path: validUrls.join('|')
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
    setWorkspacePaths(['']);
    setWebsiteUrls(['']);
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
            <MenuItem value="workspace">{t('actionTypes.workspace')}</MenuItem>
            <MenuItem value="openMultipleWebsites">{t('actionTypes.openMultipleWebsites')}</MenuItem>
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
            ) : selectedAction === 'workspace' ? (
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {t('workspaceHelper')}
                </Typography>
                {workspacePaths.map((path, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                      label={`${t('path')} ${index + 1}`}
                      fullWidth
                      value={path}
                      onChange={(e) => updateWorkspacePath(index, e.target.value)}
                      placeholder={t('workspacePlaceholder')}
                      sx={{ mr: 1 }}
                    />
                    {workspacePaths.length > 1 && (
                      <IconButton
                        onClick={() => removeWorkspacePath(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addWorkspacePath}
                  variant="outlined"
                  size="small"
                >
                  {t('addPath')}
                </Button>
              </Box>
            ) : selectedAction === 'openMultipleWebsites' ? (
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {t('multipleWebsitesHelper')}
                </Typography>
                {websiteUrls.map((url, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                      label={`Website ${index + 1}`}
                      fullWidth
                      value={url}
                      onChange={(e) => updateWebsiteUrl(index, e.target.value)}
                      placeholder={t('multipleWebsitesPlaceholder')}
                      sx={{ mr: 1 }}
                    />
                    {websiteUrls.length > 1 && (
                      <IconButton
                        onClick={() => removeWebsiteUrl(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addWebsiteUrl}
                  variant="outlined"
                  size="small"
                >
                  {t('addPath')}
                </Button>
              </Box>
            ) : pathRequiredActions.includes(selectedAction) ? (
              <TextField
                label={
                  selectedAction === 'openWebsite' ? 'URL' : 
                  selectedAction === 'createFiles' ? 'File/Folder Creation Configuration' :
                  t('path')
                }
                fullWidth
                value={actionPath}
                onChange={(e) => setActionPath(e.target.value)}
                placeholder={
                  selectedAction === 'openWebsite' ? 'https://example.com' :
                  selectedAction === 'createFiles' ? t('createFilesPlaceholder') :
                  t('pathPlaceholder')
                }
                multiline={selectedAction === 'createFiles'}
                rows={selectedAction === 'createFiles' ? 3 : 1}
                helperText={
                  selectedAction === 'createFiles' ? t('createFilesHelper') :
                  ''
                }
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
            disabled={
              !hotkeyName || 
              (selectedAction === 'replaceText' ? (!textToReplace || !replacementText) : false) ||
              (selectedAction === 'workspace' ? (workspacePaths.filter(path => path.trim() !== '').length === 0) : false) ||
              (selectedAction === 'openMultipleWebsites' ? (websiteUrls.filter(url => url.trim() !== '').length === 0) : false) ||
              (pathRequiredActions.includes(selectedAction) && selectedAction !== 'workspace' && selectedAction !== 'openMultipleWebsites' ? !actionPath : false)
            }
          >
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default KeyRecorder; 