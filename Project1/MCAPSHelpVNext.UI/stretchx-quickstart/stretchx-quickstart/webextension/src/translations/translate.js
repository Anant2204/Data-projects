/*
 * This script utilizes Azure Cognitive Services Translator API to translate English to other languages.
 * 
 * IMPORTANT: Before running this script, it is needed to set the tsconfig.json noEmit value to false.
 * Direflow sets this to true automatically when building. It is needed to set it back to false before translating.
 * "noEmit": false,
 * 
 * Set the subscriptionKey below to the key for the Azure Cognitive Services resource.
 * Do not check in this file with this key as it is considered a secret.
 */
const request = require('request');
const uuid = require('uuid');
const readFileSync = require('fs').readFileSync;
const writeFile = require('fs').writeFile;
const readdirSync = require('fs').readdirSync;
const translationsFolder = './src/translations';
const localesFolder = './src/translations/locales';

// Use Azure Cognitive Services Translator subscription key here.
// Do not check in with key set. Get it and replace here when needing to do translations.
const subscriptionKey = 'REMOVED';

/*
 * Parses locales created by react-intl-manager and create a JSON
 * that tells us whether a language is written from left to right
 * or right to left
 */
const parseLocales = (path) => {
    const locales = [];
    readdirSync(path).forEach(file => {
        if (file.slice(0, 9) != 'whitelist') {
            locales.push(file.split('.')[0])
        }
    });

    const json = { 'en': 'LtoR' }; // Add english as an option
    locales.forEach((locale) => {
        json[locale] = 'LtoR';
    });

    writeFile(`${translationsFolder}/supportedLocales.json`, JSON.stringify(json, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Created supportedLocales file');
    });

    console.log('Locales supported: ', locales);
    return locales
}

/*
 * Wraps the request into a promise so we can use async/await
 */
const requestTranslation = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            }
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}

/*
 * Iterates over every locale supported
 * Makes an API call to MS-translate to translate the default text (in English)
 * Overwrites each locale's json file with the translations from the API
 */
const translate = async () => {
    locales = parseLocales(localesFolder);

    for (const locale of locales) {
        localeFile = `${translationsFolder}/locales/${locale}.json`;
        const transData = JSON.parse(readFileSync(localeFile));

        for (const key of Object.keys(transData)) {
            console.log('translating ', transData[key]);
            const options = {
                method: 'POST',
                baseUrl: 'https://api.cognitive.microsofttranslator.com/',
                url: 'translate',
                qs: {
                    'api-version': '3.0',
                    'to': locale
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuid.v4().toString()
                },
                body: [{
                    'text': transData[key]
                }],
                json: true
            };
            const result = await requestTranslation(options);
            transData[key] = result[0].translations[0].text;
        }

        writeFile(localeFile, JSON.stringify(transData, null, 2), (err) => {
            if (err) return console.log(err);
            console.log('writing to ' + localeFile);
            console.log(transData);
        });
    }
}

translate();
