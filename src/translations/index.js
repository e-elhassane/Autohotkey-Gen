export const translations = {
  en: {
    // Header
    title: 'AHK Macro Generator',
    subtitle: 'Create and manage your AutoHotkey macros',
    
    // Form
    addMacro: 'Add New Macro',
    macroName: 'Macro Name',
    macroNamePlaceholder: 'Enter macro name...',
    selectKeys: 'Select Keys',
    pressKeys: 'Press your key combination...',
    recordedKeys: 'Recorded Keys',
    clearKeys: 'Clear Keys',
    selectAction: 'Select Action',
    actionType: 'Action Type',
    path: 'Path',
    pathPlaceholder: 'Enter path or URL...',
    replacement: 'Replacement Text',
    replacementPlaceholder: 'Enter replacement text...',
    save: 'Save Macro',
    cancel: 'Cancel',

    // Action Types
    actionTypes: {
      openApp: 'Open Application',
      openWebsite: 'Open Website',
      sendKeys: 'Send Keys',
      runCommand: 'Run Command',
      replaceText: 'Replace Text',
      volumeUp: 'Volume Up',
      volumeDown: 'Volume Down',
      brightnessUp: 'Brightness Up',
      brightnessDown: 'Brightness Down',
      quickNote: 'Quick Note',
      openOutlook: 'Open Outlook',
      composeEmail: 'Compose Email',
      activateChrome: 'Activate Chrome',
      startTimer: 'Start Timer',
      clipboardHistory: 'Clipboard History',
      aiMenu: 'AI Assistant Menu',
      mouseClick: 'Mouse Click',
      mouseMove: 'Mouse Move',
      mouseDrag: 'Mouse Drag'
    },

    // Macro List
    yourMacros: 'Your Macros',
    downloadAllInOne: 'Download All Macros in One File',
    downloadSeparate: 'Download All Macros as Separate Files',
    noMacrosYet: 'No macros added yet. Use the form above to create your first macro!',
    downloadMacro: 'Download Macro',
    deleteMacro: 'Delete Macro',
    
    // Actions descriptions
    actions: {
      openApp: 'Open application',
      openWebsite: 'Open website',
      sendKeys: 'Send keys',
      runCommand: 'Run command',
      replaceText: 'Replace text',
      volumeUp: 'Increase system volume',
      volumeDown: 'Decrease system volume',
      brightnessUp: 'Increase screen brightness',
      brightnessDown: 'Decrease screen brightness',
      quickNote: 'Open quick note window',
      openOutlook: 'Open Outlook',
      composeEmail: 'Open new email compose window',
      activateChrome: 'Activate Chrome window',
      startTimer: 'Start a timer',
      clipboardHistory: 'Save to clipboard history',
      aiMenu: 'Open AI Assistant Menu',
      mouseClick: 'Click at position',
      mouseMove: 'Move cursor to position',
      mouseDrag: 'Drag from start to end position',
      unknown: 'Unknown action'
    },

    // Validation messages
    validation: {
      required: 'This field is required',
      enterName: 'Please enter a macro name',
      selectKeys: 'Please select at least one key combination',
      selectAction: 'Please select an action type',
      enterPath: 'Please enter a path or URL',
      enterReplacement: 'Please enter replacement text'
    },

    // Tooltips
    tooltips: {
      clearKeys: 'Clear recorded keys',
      recordKeys: 'Click to record keys',
      stopRecording: 'Click to stop recording'
    }
  },
  fr: {
    // Header
    title: 'Générateur de Macros AHK',
    subtitle: 'Créez et gérez vos macros AutoHotkey',
    
    // Form
    addMacro: 'Ajouter une nouvelle macro',
    macroName: 'Nom de la macro',
    macroNamePlaceholder: 'Entrez le nom de la macro...',
    selectKeys: 'Sélectionner les touches',
    pressKeys: 'Appuyez sur votre combinaison de touches...',
    recordedKeys: 'Touches enregistrées',
    clearKeys: 'Effacer les touches',
    selectAction: 'Sélectionner une action',
    actionType: 'Type d\'action',
    path: 'Chemin',
    pathPlaceholder: 'Entrez le chemin ou l\'URL...',
    replacement: 'Texte de remplacement',
    replacementPlaceholder: 'Entrez le texte de remplacement...',
    save: 'Enregistrer la macro',
    cancel: 'Annuler',

    // Action Types
    actionTypes: {
      openApp: 'Ouvrir une application',
      openWebsite: 'Ouvrir un site web',
      sendKeys: 'Envoyer des touches',
      runCommand: 'Exécuter une commande',
      replaceText: 'Remplacer du texte',
      volumeUp: 'Augmenter le volume',
      volumeDown: 'Baisser le volume',
      brightnessUp: 'Augmenter la luminosité',
      brightnessDown: 'Diminuer la luminosité',
      quickNote: 'Note rapide',
      openOutlook: 'Ouvrir Outlook',
      composeEmail: 'Composer un email',
      activateChrome: 'Activer Chrome',
      startTimer: 'Démarrer un minuteur',
      clipboardHistory: 'Historique du presse-papiers',
      aiMenu: 'Menu Assistant IA'
    },

    // Macro List
    yourMacros: 'Vos Macros',
    downloadAllInOne: 'Télécharger toutes les macros dans un fichier',
    downloadSeparate: 'Télécharger les macros séparément',
    noMacrosYet: 'Aucune macro ajoutée. Utilisez le formulaire ci-dessus pour créer votre première macro !',
    downloadMacro: 'Télécharger la macro',
    deleteMacro: 'Supprimer la macro',
    
    // Actions descriptions
    actions: {
      openApp: 'Ouvrir l\'application',
      openWebsite: 'Ouvrir le site web',
      sendKeys: 'Envoyer des touches',
      runCommand: 'Exécuter la commande',
      replaceText: 'Remplacer le texte',
      volumeUp: 'Augmenter le volume système',
      volumeDown: 'Baisser le volume système',
      brightnessUp: 'Augmenter la luminosité',
      brightnessDown: 'Diminuer la luminosité',
      quickNote: 'Ouvrir la fenêtre de note rapide',
      openOutlook: 'Ouvrir Outlook',
      composeEmail: 'Ouvrir une nouvelle fenêtre de composition d\'email',
      activateChrome: 'Activer la fenêtre Chrome',
      startTimer: 'Démarrer un minuteur',
      clipboardHistory: 'Sauvegarder dans l\'historique du presse-papiers',
      aiMenu: 'Ouvrir le Menu Assistant IA',
      unknown: 'Action inconnue'
    },

    // Validation messages
    validation: {
      required: 'Ce champ est obligatoire',
      enterName: 'Veuillez entrer un nom de macro',
      selectKeys: 'Veuillez sélectionner au moins une combinaison de touches',
      selectAction: 'Veuillez sélectionner un type d\'action',
      enterPath: 'Veuillez entrer un chemin ou une URL',
      enterReplacement: 'Veuillez entrer un texte de remplacement'
    },

    // Tooltips
    tooltips: {
      clearKeys: 'Effacer les touches enregistrées',
      recordKeys: 'Cliquez pour enregistrer les touches',
      stopRecording: 'Cliquez pour arrêter l\'enregistrement'
    }
  }
}; 