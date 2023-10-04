import i18next from 'i18next';

import home_en from "./en/home.json";
import menu_en from "./en/menu.json";
import common_en from './en/common.json';
import guidelines_en from './en/guidelines.json';
import view_feedback_en from './en/view_feedback.json';
import sign_up_en from './en/sign_up.json';
import sign_in_en from './en/sign_in.json';
import framework_en from './en/framework.json';
import modal_form_en from './en/modal_form.json';
import rating_en from './en/rating.json';
import app_drawer_en from './en/app_drawer.json';
import dashboard_en from './en/dashboard.json';
import ecos_dashboard_en from './en/ecos_dashboard.json';

import home_pt_br from './pt_br/home.json';
import menu_pt_br from './pt_br/menu.json';
import common_pt_br from './pt_br/common.json';
import guidelines_pt_br from './pt_br/guidelines.json';
import view_feedback_pt_br from './pt_br/view_feedback.json';
import sign_up_pt_br from './pt_br/sign_up.json';
import sign_in_pt_br from './pt_br/sign_in.json';
import framework_pt_br from './pt_br/framework.json';
import modal_form_pt_br from './pt_br/modal_form.json';
import rating_pt_br from './pt_br/rating.json';
import app_drawer_pt_br from './pt_br/app_drawer.json';
import dashboard_pt_br from './pt_br/dashboard.json';
import ecos_dashboard_pt_br from './pt_br/ecos_dashboard.json';

const navigatorLanguage = navigator.language.toLocaleLowerCase().replace('-', '_');
i18next.init({
  interpolation: { escapeValue: false },
  lng: (navigatorLanguage == 'pt_br') ? 'pt_br' : 'en',
  resources: {
    en: {
      home: home_en,
      menu: menu_en,
      common: common_en,
      guidelines: guidelines_en,
      view_feedback: view_feedback_en,
      sign_up: sign_up_en,
      sign_in: sign_in_en,
      framework: framework_en,
      modal_form: modal_form_en,
      rating: rating_en,
      app_drawer: app_drawer_en,
      dashboard: dashboard_en,
      ecos_dashboard: ecos_dashboard_en
    },
    pt_br: {
      home: home_pt_br,
      menu: menu_pt_br,
      common: common_pt_br,
      guidelines: guidelines_pt_br,
      view_feedback: view_feedback_pt_br,
      sign_up: sign_up_pt_br,
      sign_in: sign_in_pt_br,
      framework: framework_pt_br,
      modal_form: modal_form_pt_br,
      rating: rating_pt_br,
      app_drawer: app_drawer_pt_br,
      dashboard: dashboard_pt_br,
      ecos_dashboard: ecos_dashboard_pt_br
    },
  },
});

export default i18next;