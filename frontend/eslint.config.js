export default [
    {
        ignores: ['node_modules/**', 'build/**'], // Abaikan folder tertentu
    },
    {
        files: ['**/*.js', '**/*.jsx'], // File yang akan diperiksa
        languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        },
        rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        },
    },
];