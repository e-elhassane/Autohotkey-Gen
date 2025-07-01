// =====================================
// Composant MacroList
// Affiche la liste des macros enregistrées et permet leur gestion (suppression, téléchargement)
// =====================================

import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Download, Edit } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { useLanguage } from '../contexts/LanguageContext';

// =============================
// Composant principal MacroList
// =============================
function MacroList({ hotkeys, onDeleteHotkey, onDownload }) {
  // Gestion de la langue
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();

  // =============================
  // Retourne la description de l'action pour affichage
  // =============================
  const getActionDescription = (action) => {
    switch (action.type) {
      case 'openApp':
        return `${t('actions.openApp')}: ${action.path}`;
      case 'openWebsite':
        return `${t('actions.openWebsite')}: ${action.path}`;
      case 'replaceText':
        return `${t('actions.replaceText')}: ${action.path} → ${action.replacement}`;
      case 'volumeUp':
        return t('actions.volumeUp');
      case 'volumeDown':
        return t('actions.volumeDown');
      case 'workspace':
        return `${t('actions.workspace')}: ${action.path}`;
      case 'openMultipleWebsites':
        return `${t('actions.openMultipleWebsites')}: ${action.path}`;
      case 'quickNote':
        return t('actions.quickNote');
      case 'startTimer':
        return t('actions.startTimer');
      case 'clipboardHistory':
        return t('actions.clipboardHistory');
      case 'aiMenu':
        return t('actions.aiMenu');
      default:
        return t('actions.unknown');
    }
  };

  // =============================
  // Téléchargement d'une macro individuelle
  // =============================
  const handleDownload = (hotkey) => {
    const script = generateAHKScript([hotkey]);
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${hotkey.name}.ahk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // =============================
  // Téléchargement de toutes les macros dans un seul fichier
  // =============================
  const handleDownloadAll = () => {
    if (hotkeys.length === 0) return;
    const script = generateAHKScript(hotkeys);
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_macros.ahk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // =============================
  // Téléchargement de chaque macro dans un fichier séparé
  // =============================
  const handleDownloadSeparateFiles = () => {
    if (hotkeys.length === 0) return;
    hotkeys.forEach(hotkey => {
      const script = generateAHKScript([hotkey]);
      const blob = new Blob([script], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${hotkey.name}.ahk`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  // =============================
  // Utilitaires pour la conversion des touches
  // =============================
  const stripKeyCode = (key) => {
    return key.split(' (')[0];
  };

  const extractOriginalKey = (displayKey) => {
    // Extrait la touche originale du format "A (KeyA)" ou "NUMPAD4"
    if (displayKey.startsWith('NUMPAD')) {
      return displayKey; // Pour les touches numpad, retourner directement
    }
    const match = displayKey.match(/^([^ ]+)/);
    return match ? match[1] : displayKey;
  };

  const convertToAHKKey = (key) => {
    // Conversion des modificateurs et touches spéciales pour AHK
    switch (key.toUpperCase()) {
      case 'CTRL':
        return '^';
      case 'ALT':
        return '!';
      case 'SHIFT':
        return '+';
      case 'WIN':
        return '#';
      case 'ENTER':
        return '{Enter}';
      case 'ESCAPE':
      case 'ESC':
        return '{Escape}';
      case 'TAB':
        return '{Tab}';
      case 'SPACE':
        return '{Space}';
      case 'BACKSPACE':
        return '{Backspace}';
      case 'DELETE':
        return '{Delete}';
      case 'UP':
        return '{Up}';
      case 'DOWN':
        return '{Down}';
      case 'LEFT':
        return '{Left}';
      case 'RIGHT':
        return '{Right}';
      case 'PAGEUP':
        return '{PgUp}';
      case 'PAGEDOWN':
        return '{PgDn}';
      case 'HOME':
        return '{Home}';
      case 'END':
        return '{End}';
      case 'INSERT':
        return '{Insert}';
      case 'F1': case 'F2': case 'F3': case 'F4': case 'F5': case 'F6':
      case 'F7': case 'F8': case 'F9': case 'F10': case 'F11': case 'F12':
        return `${key}`;
      // Numpad keys
      case 'NUMPAD0': case 'NUMPAD 0': case 'NUM0':
        return 'Numpad0';
      case 'NUMPAD1': case 'NUMPAD 1': case 'NUM1':
        return 'Numpad1';
      case 'NUMPAD2': case 'NUMPAD 2': case 'NUM2':
        return 'Numpad2';
      case 'NUMPAD3': case 'NUMPAD 3': case 'NUM3':
        return 'Numpad3';
      case 'NUMPAD4': case 'NUMPAD 4': case 'NUM4':
        return 'Numpad4';
      case 'NUMPAD5': case 'NUMPAD 5': case 'NUM5':
        return 'Numpad5';
      case 'NUMPAD6': case 'NUMPAD 6': case 'NUM6':
        return 'Numpad6';
      case 'NUMPAD7': case 'NUMPAD 7': case 'NUM7':
        return 'Numpad7';
      case 'NUMPAD8': case 'NUMPAD 8': case 'NUM8':
        return 'Numpad8';
      case 'NUMPAD9': case 'NUMPAD 9': case 'NUM9':
        return 'Numpad9';
      case 'NUMPADMULTIPLY': case 'NUMPAD *': case 'NUM*':
        return 'NumpadMult';
      case 'NUMPADADD': case 'NUMPAD +': case 'NUM+':
        return 'NumpadAdd';
      case 'NUMPADSUBTRACT': case 'NUMPAD -': case 'NUM-':
        return 'NumpadSub';
      case 'NUMPADDECIMAL': case 'NUMPAD .': case 'NUM.':
        return 'NumpadDot';
      case 'NUMPADDIVIDE': case 'NUMPAD /': case 'NUM/':
        return 'NumpadDiv';
      case 'NUMPADENTER': case 'NUMPAD ENTER':
        return 'NumpadEnter';
      case 'NUMLOCK':
        return 'NumLock';
      default:
        return key;
    }
  };

  // =============================
  // Génération du script AutoHotkey à partir des macros
  // =============================
  const generateAHKScript = (selectedHotkeys) => {
    const header = `; AutoHotkey Script Generated by AHK Generator\n#NoEnv\n#SingleInstance Force\nSetWorkingDir %A_ScriptDir%\n\n; === Macro Configuration ===\n; This script contains your custom macros and text replacements\n\n; Initialize custom AI menu\nMenu, AI_Menu, Add, Open ChatGPT, OpenChatGPT\nMenu, AI_Menu, Add, Ask GPT (Prompt), PromptGPT\nreturn  ; End of auto-execute section\n`;
    const hotkeyScripts = selectedHotkeys.map(hotkey => {
      if (hotkey.action.type === 'replaceText') {
        return `; ${hotkey.name}\n:*:${hotkey.action.path}::${hotkey.action.replacement}\n`;
      }
      const keys = hotkey.keys.map(k => convertToAHKKey(extractOriginalKey(k))).join('');
      let action = '';
      switch (hotkey.action.type) {
        case 'openApp':
          action = `Run, ${hotkey.action.path}`;
          break;
        case 'openWebsite':
          action = `Run, ${hotkey.action.path}`;
          break;
        case 'volumeUp':
          action = 'Send, {Volume_Up}';
          break;
        case 'volumeDown':
          action = 'Send, {Volume_Down}';
          break;
        case 'workspace':
          action = `OpenWorkspace("${hotkey.action.path}")`;
          break;
        case 'openMultipleWebsites':
          action = `OpenMultipleWebsites("${hotkey.action.path}")`;
          break;
        case 'quickNote':
          action = 'QuickNote()';
          break;
        case 'startTimer':
          action = 'StartTimer()';
          break;
        case 'clipboardHistory':
          action = 'ClipboardHistory()';
          break;
        case 'aiMenu':
          action = 'Menu, AI_Menu, Show  ; Show the AI Assistant menu';
          break;
        default:
          action = `; Unknown action type: ${hotkey.action.type}`;
          break;
      }
      return `; ${hotkey.name}\n${keys}::\n${action}\nreturn  ; End of ${hotkey.name} hotkey\n`;
    }).join('\n');
    const functions = [
      '',
      '; === Utility Functions ===',
      'ClipboardHistory() {',
      '    FormatTime, TimeString,, yyyy-MM-dd HH:mm:ss',
      '    FileAppend, %TimeString%: %Clipboard%\n, %A_ScriptDir%/clipboard_history.txt',
      '    TrayTip, Clipboard History, Entry saved!, 2',
      '    return',
      '}',
      '',
      'QuickNote() {',
      '    global NoteContent  ; Make GUI control variable global',
      '    Gui, Note:New',
      '    Gui, Note:Add, Edit, vNoteContent w300 h200',
      '    Gui, Note:Add, Button, gSaveNote, Save Note',
      '    Gui, Note:Show,, Quick Note',
      '    return',
      'SaveNote:',
      '    Gui, Note:Submit',
      '    FormatTime, TimeString,, yyyy-MM-dd HH:mm:ss',
      '    FileAppend, %TimeString%:`n%NoteContent%`n---`n, %A_ScriptDir%/quick_notes.txt',
      '    return',
      '}',
      '',
      'StartTimer() {',
      '    InputBox, Minutes, Timer, Enter minutes:',
      '    if !ErrorLevel {',
      '        SetTimer, TimerDone, % Minutes * 60000',
      '        TrayTip, Timer Started, Will notify in %Minutes% minutes, 2',
      '    }',
      '    return',
      'TimerDone:',
      '    SetTimer, TimerDone, Off',
      '    MsgBox Timer Done!',
      '    return',
      '}',
      '',
      'OpenWorkspace(workspaceConfig) {',
      '    ; Parse workspace configuration (format: "app1.exe|folder1|app2.exe|folder2")',
      '    Loop, Parse, workspaceConfig, |',
      '    {',
      '        item := A_LoopField',
      '        if (SubStr(item, -3) = ".exe" || SubStr(item, -3) = ".lnk") {',
      '            ; It\'s an application',
      '            Run, %item%',
      '            Sleep, 1000  ; Wait for app to start',
      '        } else {',
      '            ; It\'s a folder',
      '            Run, explorer.exe "%item%"',
      '            Sleep, 500   ; Wait for folder to open',
      '        }',
      '    }',
      '    TrayTip, Workspace, Workspace opened successfully!, 2',
      '    return',
      '}',
      '',
      'OpenMultipleWebsites(websitesConfig) {',
      '    ; Parse multiple websites configuration (format: "url1|url2|url3")',
      '    Loop, Parse, websitesConfig, |',
      '    {',
      '        url := A_LoopField',
      '        if (url != "") {',
      '            ; Open website in default browser',
      '            Run, %url%',
      '            Sleep, 500  ; Small delay between opening websites',
      '        }',
      '    }',
      '    TrayTip, Multiple Websites, Websites opened successfully!, 2',
      '    return',
      '}',
      '',
      'OpenChatGPT:',
      '    Run, https://chat.openai.com',
      '    return',
      '',
      'PromptGPT:',
      '    InputBox, userPrompt, Ask ChatGPT, Enter your question:',
      '    if (userPrompt != "") {',
      '        query := StrReplace(userPrompt, " ", "+")',
      '        Run, https://chat.openai.com/?q=%query%',
      '    }',
      '    return',
      ''
    ].join('\n');
    return header + hotkeyScripts + functions;
  };

  // =============================
  // Rendu de la liste des macros et des boutons de gestion
  // =============================
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FormatListBulletedIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          {t('yourMacros')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Bouton pour télécharger toutes les macros dans un seul fichier */}
          <Tooltip title={t('downloadAllInOne')}>
            <IconButton 
              onClick={handleDownloadAll}
              color="primary"
              sx={{ mr: 1 }}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          {/* Bouton pour télécharger chaque macro séparément */}
          <Tooltip title={t('downloadSeparate')}>
            <IconButton 
              onClick={handleDownloadSeparateFiles}
              color="primary"
            >
              <FolderZipIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Affichage de la liste ou d'un message si aucune macro */}
      {hotkeys.length === 0 ? (
        <Paper 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            bgcolor: 'grey.50',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'grey.300'
          }}
        >
          <Typography color="textSecondary">
            {t('noMacrosYet')}
          </Typography>
        </Paper>
      ) : (
        <List sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          {hotkeys.map((hotkey, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Box sx={{ display: 'flex' }}>
                  {/* Bouton de téléchargement individuel */}
                  <Tooltip title={t('downloadMacro')}>
                    <IconButton 
                      edge="end" 
                      aria-label="download"
                      onClick={() => handleDownload(hotkey)}
                      sx={{ 
                        mr: 1,
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.lighter'
                        }
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  {/* Bouton de suppression */}
                  <Tooltip title={t('deleteMacro')}>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => onDeleteHotkey(index)}
                      sx={{ 
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: 'error.lighter'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
              sx={{
                borderBottom: index < hotkeys.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="div">
                    {hotkey.name}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography 
                      variant="body2" 
                      color="primary"
                      component="span"
                      sx={{ 
                        display: 'inline-block',
                        bgcolor: 'primary.lighter',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        mr: 1
                      }}
                    >
                      {hotkey.keys.join(' + ')}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      component="span"
                    >
                      {getActionDescription(hotkey.action)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default MacroList;


