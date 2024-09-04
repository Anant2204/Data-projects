/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * File: updateTsConfig.js
 * Description: Configuration file for translation.
 */
const replace = require('replace-in-file');

// The tsconfig.json needs to have noEmit set to false for translations to work.
// When running the project, Direflow automatically will set this back to true as it is needed to be that way for Direflow.

const options = {
    files: './tsconfig.json',
    from: /"noEmit": true,/g,
    to: '"noEmit": false,'
};

try {
    replace.sync(options);
} catch (error) {
    console.error('Error occurred:', error);
}
