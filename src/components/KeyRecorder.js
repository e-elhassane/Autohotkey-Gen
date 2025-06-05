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

function KeyRecorder({ onAddHotkey }) {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedKeys, setRecordedKeys] = useState([]);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [actionPath, setActionPath] = useState('');
  const [replacementText, setReplacementText] = useState('');
  const [textToReplace, setTextToReplace] = useState('');
  const [hotkeyName, setHotkeyName] = useState('');

  const pathRequiredActions = ['openApp', 'openWebsite', 'sendKeys'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isRecording) return;
      
      e.preventDefault();
      const key = e.key.toUpperCase();
      const modifiers = [];
      
      // Add any pressed modifier keys
      if (e.ctrlKey && key !== 'CONTROL') modifiers.push('Ctrl');
      if (e.altKey && key !== 'ALT') modifiers.push('Alt');
      if (e.shiftKey && key !== 'SHIFT') modifiers.push('Shift');
      if (e.metaKey && key !== 'META') modifiers.push('Win');
      
      // Show the actual key pressed
      const displayKey = key === 'CONTROL' || key === 'ALT' || key === 'SHIFT' || key === 'META' 
        ? key 
        : `${key} (${e.code})`;
      
      setRecordedKeys([...modifiers, displayKey]);
    };

    if (isRecording) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordedKeys.length > 0) {
      setIsActionDialogOpen(true);
    }
  };

  const handleSaveHotkey = () => {
    let hotkey;
    
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

    onAddHotkey(hotkey);
    
    // Reset everything
    setIsActionDialogOpen(false);
    setSelectedAction('');
    setActionPath('');
    setReplacementText('');
    setTextToReplace('');
    setHotkeyName('');
    setRecordedKeys([]);
  };

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
            <MenuItem value="sendKeys">{t('actionTypes.sendKeys')}</MenuItem>
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
                  {t('clearKeys')}
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
            
            {selectedAction === 'replaceText' ? (
              <>
                <TextField
                  label={t('path')}
                  fullWidth
                  value={textToReplace}
                  onChange={(e) => setTextToReplace(e.target.value)}
                  placeholder={t('pathPlaceholder')}
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