const replace = require('replace-in-file');

// The tsconfig.json needs to have noEmit set to false for translations to work.

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
