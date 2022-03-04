const path = require('path');
module.exports = {
    extends: [
        'airbnb-typescript',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            tsx: true
        }
    },
    rules: {
        'prettier/prettier': ['error'],
        indent: [0],
        '@typescript-eslint/indent': [0],
        '@typescript-eslint/explicit-function-return-type': [2],
        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/interface-name-prefix': [0],
        '@typescript-eslint/no-non-null-assertion': [0],
        '@typescript-eslint/unbound-method': [0],
        'brace-style': [2, '1tbs', { allowSingleLine: true }],
        'import/no-unresolved': [0],
        'js-a11y/anchor-is-valid': [0], // we use anchors as buttons
        'jsx-a11y/anchor-is-valid': [0],
        'prefer-promise-reject-errors': [0],
        'import/extensions': ['off'],
        'no-param-reassign': ['off'],
        'simple-import-sort/sort': ['warn'],
        'import/prefer-default-export': ['off']
    }
};
