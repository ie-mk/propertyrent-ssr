import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {},
  },
  lt: {
    translation: {
      'Search Now': 'Paieška',
      'Town, city': 'Miestas',
      'Please enter your stay details': 'Įveskite paieškos duomenis',
      login: 'Prisijungti',
      Logout: 'Atsijungti',
      'Create New': 'Sukurti naują',
      'MY PROFILE': 'MANO PROFILIS',
      NOTIFICATIONS: 'PRANEŠIMAI',
      'PROPERTIES LIST': 'MANO SKELBIMAI',
      'FAVOURITE LIST': 'MĖGSTAMIAUSI',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
