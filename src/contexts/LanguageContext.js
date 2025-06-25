// =====================================
// Contexte de langue (LanguageContext)
// Permet la gestion de la langue et la traduction dans toute l'application
// =====================================

import React, { createContext, useState, useContext } from 'react';
import { translations } from '../translations';

// Création du contexte de langue
const LanguageContext = createContext();

// Provider du contexte de langue
export const LanguageProvider = ({ children }) => {
  // État de la langue courante
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Fonction de traduction (récupère la clé dans l'objet de traduction)
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

  // Valeur du contexte
  const value = {
    currentLanguage,
    setCurrentLanguage,
    t
  };

  // Fournit le contexte à tous les enfants
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 