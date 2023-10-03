import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import home_en from "./translations/en/home.json";
import home_pt_br from './translations/pt_br/home.json';


i18next.init({
  interpolation: { escapeValue: false }, 
  lng: 'pt_br',
  resources: {
    en: {
      home: home_en
    },
    pt_br: {
      home: home_pt_br
    },
  },
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
)
