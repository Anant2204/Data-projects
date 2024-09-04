/*
 * This script takes the extracted string outputted by babel-react-intl plugin
 * and generates two files per supported locale. This library tracks translations
 * and makes sure there are no duplicate keys
 */

// Edgecase: make sure that manage translation does not overwrite translations
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'build/messages/extracted/',
  translationsDirectory: 'src/translations/locales/',
  languages: ['de', 'fr', 'hu', 'it', 'pl','ru', 'es', 'tr', 'zh-CN', 'zh-TW', 'ja', 'ko', 'ar', 'bg', 'el', 'id', 'pt', 'ro', 'sr', 'th', 'vi', 'he', 'uk' ] // Any translation --- don't include the default language
});
