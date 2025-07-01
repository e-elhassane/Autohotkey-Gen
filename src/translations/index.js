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
    workspacePlaceholder: 'Enter path to application or folder...',
    workspaceHelper: 'Add applications (.exe) or folders to open together',
    addPath: 'Add Path',
    removePath: 'Remove',
    multipleWebsitesPlaceholder: 'Enter website URL...',
    multipleWebsitesHelper: 'Add multiple websites to open together',
    replacement: 'Replacement Text',
    replacementPlaceholder: 'Enter replacement text...',
    save: 'Save Macro',
    cancel: 'Cancel',
    textToReplace: 'Text to replace',
    textToReplacePlaceholder: 'Enter the text you want to replace...',
    saveKey: 'Save Key',

    // Action Types
    actionTypes: {
      openApp: 'Open Application',
      openWebsite: 'Open Website',
      runCommand: 'Run Command',
      replaceText: 'Replace Text',
      volumeUp: 'Volume Up',
      volumeDown: 'Volume Down',
      workspace: 'Open Workspace (Multiple Apps/Folders)',
      openMultipleWebsites: 'Open Multiple Websites',
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
      runCommand: 'Run command',
      replaceText: 'Replace text',
      volumeUp: 'Increase system volume',
      volumeDown: 'Decrease system volume',
      workspace: 'Open workspace with multiple apps and folders',
      openMultipleWebsites: 'Open multiple websites',
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
    },

    // Navigation
    navigation: {
      macroGenerator: 'Macro Generator',
      secondKeyboard: 'Second Keyboard'
    },

    // Second Keyboard Page
    secondKeyboard: {
      title: 'Second Keyboard Setup',
      subtitle: 'Transform any USB keyboard into a powerful macro keyboard using HID Remapper',
      openConfig: 'Open HID Remapper Config',
      whatIsHID: 'What is HID Remapper?',
      whatIsHIDDesc: "It's an open-source firmware that allows you to remap any USB HID device (keyboard, mouse, gamepad) to send different inputs. Perfect for creating a dedicated macro keyboard!",
      setupGuide: 'Setup Guide',
      proTips: 'Pro Tips',
      importantNotes: 'Important Notes',
      steps: {
        step1: {
          title: '1. Download HID Remapper',
          description: 'Download the HID Remapper firmware from the official website.',
          linkText: 'Download HID Remapper'
        },
        step2: {
          title: '2. Flash Your Device',
          description: 'Flash the HID Remapper firmware to your compatible device (Arduino Pro Micro, etc.).',
          linkText: 'Flashing Guide'
        },
        step3: {
          title: '3. Configure Mappings',
          description: 'Use the HID Remapper configuration tool to set up your key mappings.',
          linkText: 'Open Config Tool'
        },
        step4: {
          title: '4. Test Your Setup',
          description: 'Test your second keyboard to ensure all mappings work correctly.'
        }
      },
      tips: [
        'Use a mechanical keyboard for better tactile feedback',
        'Consider using different colored keycaps for your second keyboard',
        'Start with simple mappings and gradually add complexity',
        'Keep a backup of your configuration',
        'Use layers to organize different sets of mappings'
      ],
      notes: [
        'HID Remapper requires a compatible microcontroller (Arduino Pro Micro, Leonardo, etc.)',
        'The device will appear as a new keyboard/mouse to your computer',
        'You can have multiple layers of mappings for different use cases',
        'For advanced users, you can create custom expressions and macros'
      ]
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
    workspacePlaceholder: 'Entrez le chemin vers l\'application ou le dossier...',
    workspaceHelper: 'Ajoutez des applications (.exe) ou des dossiers à ouvrir ensemble',
    addPath: 'Ajouter un chemin',
    removePath: 'Supprimer',
    multipleWebsitesPlaceholder: 'Entrez l\'URL du site web...',
    multipleWebsitesHelper: 'Ajoutez plusieurs sites web à ouvrir ensemble',
    replacement: 'Texte de remplacement',
    replacementPlaceholder: 'Entrez le texte de remplacement...',
    save: 'Enregistrer la macro',
    cancel: 'Annuler',
    textToReplace: 'Texte à remplacer',
    textToReplacePlaceholder: 'Entrez le texte que vous souhaitez remplacer...',
    saveKey: 'Enregistrer la touche',

    // Action Types
    actionTypes: {
      openApp: 'Ouvrir une application',
      openWebsite: 'Ouvrir un site web',
      runCommand: 'Exécuter une commande',
      replaceText: 'Remplacer du texte',
      volumeUp: 'Augmenter le volume',
      volumeDown: 'Baisser le volume',
      workspace: 'Ouvrir un espace de travail (Applications/Dossiers multiples)',
      openMultipleWebsites: 'Ouvrir plusieurs sites web',
      quickNote: 'Note rapide',
      openOutlook: 'Ouvrir Outlook',
      composeEmail: 'Composer un email',
      activateChrome: 'Activer Chrome',
      startTimer: 'Démarrer un minuteur',
      clipboardHistory: 'Historique du presse-papiers',
      aiMenu: 'Menu Assistant IA',
      mouseClick: 'Click at position',
      mouseMove: 'Move cursor to position',
      mouseDrag: 'Drag from start to end position'
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
      runCommand: 'Exécuter la commande',
      replaceText: 'Remplacer le texte',
      volumeUp: 'Augmenter le volume système',
      volumeDown: 'Baisser le volume système',
      workspace: 'Ouvrir un espace de travail avec plusieurs applications et dossiers',
      openMultipleWebsites: 'Ouvrir plusieurs sites web',
      quickNote: 'Ouvrir la fenêtre de note rapide',
      openOutlook: 'Ouvrir Outlook',
      composeEmail: 'Ouvrir une nouvelle fenêtre de composition d\'email',
      activateChrome: 'Activer la fenêtre Chrome',
      startTimer: 'Démarrer un minuteur',
      clipboardHistory: 'Sauvegarder dans l\'historique du presse-papiers',
      aiMenu: 'Ouvrir le Menu Assistant IA',
      mouseClick: 'Click at position',
      mouseMove: 'Move cursor to position',
      mouseDrag: 'Drag from start to end position',
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
    },

    // Navigation
    navigation: {
      macroGenerator: 'Générateur de Macros AHK',
      secondKeyboard: 'Clavier Secondaire'
    },

    // Second Keyboard Page
    secondKeyboard: {
      title: 'Configuration du Clavier Secondaire',
      subtitle: 'Transformez n\'importe quel clavier USB en un puissant clavier de macros avec HID Remapper',
      openConfig: 'Ouvrir la Configuration HID Remapper',
      whatIsHID: 'Qu\'est-ce que HID Remapper ?',
      whatIsHIDDesc: 'C\'est un firmware open-source qui vous permet de remapper n\'importe quel périphérique USB HID (clavier, souris, manette) pour envoyer des entrées différentes. Parfait pour créer un clavier de macros dédié !',
      setupGuide: 'Guide d\'Installation',
      proTips: 'Conseils Pro',
      importantNotes: 'Notes Importantes',
      steps: {
        step1: {
          title: '1. Télécharger HID Remapper',
          description: 'Télécharger le firmware HID Remapper depuis le site officiel.',
          linkText: 'Télécharger HID Remapper'
        },
        step2: {
          title: '2. Flasher Votre Appareil',
          description: 'Flasher le firmware HID Remapper sur votre appareil compatible (Arduino Pro Micro, etc.).',
          linkText: 'Guide de Flashing'
        },
        step3: {
          title: '3. Configurer les Mappages',
          description: 'Utiliser l\'outil de configuration HID Remapper pour configurer vos mappages de touches.',
          linkText: 'Ouvrir l\'Outil de Configuration'
        },
        step4: {
          title: '4. Tester Votre Configuration',
          description: 'Tester votre second clavier pour s\'assurer que tous les mappages fonctionnent correctement.'
        }
      },
      tips: [
        'Utiliser un clavier mécanique pour une meilleure réaction tactile',
        'Considérer l\'utilisation de différentes couleurs de touches pour votre second clavier',
        'Commencer avec des mappages simples et ajouter progressivement de la complexité',
        'Garder une copie de votre configuration',
        'Utiliser des couches pour organiser différents ensembles de mappages'
      ],
      notes: [
        'HID Remapper nécessite un microcontrôleur compatible (Arduino Pro Micro, Leonardo, etc.)',
        'L\'appareil apparaîtra comme un nouveau clavier/souris pour votre ordinateur',
        'Vous pouvez avoir plusieurs couches de mappages pour différents cas d\'utilisation',
        'Pour les utilisateurs avancés, vous pouvez créer des expressions et macros personnalisées'
      ]
    }
  }
}; 