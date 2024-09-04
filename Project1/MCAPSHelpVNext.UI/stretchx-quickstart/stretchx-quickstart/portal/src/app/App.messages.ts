import { addLocaleData } from "react-intl";
import { IMessageTranslationMap } from '@msx/platform-services';

import localeEn from 'react-intl/locale-data/en';
import localeEs from 'react-intl/locale-data/es';
import localeDe from 'react-intl/locale-data/de';
import localeFr from 'react-intl/locale-data/fr';
import localeHu from 'react-intl/locale-data/hu';
import localeIt from 'react-intl/locale-data/it';
import localeJa from 'react-intl/locale-data/ja';
import localeKo from 'react-intl/locale-data/ko';
import localePl from 'react-intl/locale-data/pl';
import localeRu from 'react-intl/locale-data/ru';
import localeTr from 'react-intl/locale-data/tr';
import localeZhCn from 'react-intl/locale-data/zh';
import localeZhTw from 'react-intl/locale-data/zh';
import localeAr from 'react-intl/locale-data/ar'; //arabic
import localeBg from 'react-intl/locale-data/bg'; //bulgarian
import localeEl from 'react-intl/locale-data/el'; //greek
import localeId from 'react-intl/locale-data/id'; //indonesian
import localePt from 'react-intl/locale-data/pt'; //portuguese
import localeRo from 'react-intl/locale-data/ro'; //Romanian
import localeSr from 'react-intl/locale-data/sr'; //Serbian
import localeTh from 'react-intl/locale-data/th'; //Thai
import localeVi from 'react-intl/locale-data/vi'; // Vietnamese
import localeHe from 'react-intl/locale-data/he'; //hebrew
import localeUk from 'react-intl/locale-data/uk'; //Ukrainian

import messagesDe from '../translations/locales/de.json';
import messagesFr from '../translations/locales/fr.json';
import messagesHu from '../translations/locales/hu.json';
import messagesEs from '../translations/locales/es.json';
import messagesIt from '../translations/locales/it.json';
import messagesJa from '../translations/locales/ja.json';
import messagesKo from '../translations/locales/ko.json';
import messagesPl from '../translations/locales/pl.json';
import messagesRu from '../translations/locales/ru.json';
import messageTr from '../translations/locales/tr.json';
import messagesZhCn from '../translations/locales/zh-CN.json';
import messagesZhTw from '../translations/locales/zh-TW.json';
import messagesAr from '../translations/locales/ar.json'; //arabic
import messagesBg from '../translations/locales/bg.json'; //bulgrian
import messagesEl from '../translations/locales/el.json'; //greek
import messagesId from '../translations/locales/id.json'; //indonesian
import messagesPt from '../translations/locales/pt.json'; //portuguese
import messagesRo from '../translations/locales/ro.json'; //Romanian
import messagesSr from '../translations/locales/sr.json'; //Serbian
import messagesTh from '../translations/locales/th.json'; //Thai
import messagesVi from '../translations/locales/vi.json'; // Vietnamese
import messagesHe from '../translations/locales/he.json'; //hebrew
import messagesUk from '../translations/locales/uk.json'; //Ukrainian



addLocaleData([
  ...localeEn,
  ...localeDe,
  ...localeFr,
  ...localeHu,
  ...localeJa,
  ...localeIt,
  ...localeKo,
  ...localePl,
  ...localeRu,
  ...localeTr,
  ...localeZhCn,
  ...localeZhTw,
  ...localeEs,
  ...localeAr, 
  ...localeBg, 
  ...localeEl, 
  ...localeId, 
  ...localePt, 
  ...localeRo,
  ...localeSr, 
  ...localeTh, 
  ...localeVi, 
  ...localeHe, 
  ...localeUk
]);

export const messages: IMessageTranslationMap = {
  'en': null,
  'de': messagesDe,
  'fr': messagesFr,
  'hu': messagesHu,
  es: messagesEs,
  it: messagesIt,
  ja: messagesJa,
  ko: messagesKo,
  pl: messagesPl,
  ru: messagesRu,
  tr: messageTr,
  'zh-CN': messagesZhCn,
  'zh-TW': messagesZhTw,
  ar: messagesAr,
  bg: messagesBg,
  el: messagesEl,
  id: messagesId,
  pt: messagesPt,
  ro: messagesRo,
  sr: messagesSr,
  th: messagesTh,
  vi: messagesVi,
  he: messagesHe,
  uk: messagesUk,
};
