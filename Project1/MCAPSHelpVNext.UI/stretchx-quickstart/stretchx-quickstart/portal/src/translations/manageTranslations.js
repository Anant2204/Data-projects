
/* copyright (c) Microsoft Corporation. All rights reserved. */

// Edgecase: make sure that manage translation does not overwrite translations
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'build/messages/extracted/',
  translationsDirectory: 'src/translations/locales/',
  languages: ['de', 'fr', 'hu', 'it', 'pl','ru', 'es', 'tr', 'zh-CN', 'zh-TW', 'ja', 'ko', 'ar', 'bg', 'el', 'id', 'pt', 'ro', 'sr', 'th', 'vi', 'he', 'uk' ] // Any translation --- don't include the default language
});
