import resolve from 'rollup-plugin-node-resolve';

export default [
    {
        input: 'site/index.js',
        output: {
            file: 'site/dist/index-bundle.js',
            format: 'iife'
        },
        plugins: [resolve()]
    },
    {
        input: 'site/form.js',
        output: {
            file: 'site/dist/form-bundle.js',
            format: 'iife'
        },
        plugins: [resolve()]
    },
    {
        input: 'site/bootstrap.js',
        output: {
            file: 'site/dist/bootstrap-bundle.js',
            format: 'iife'
        },
        plugins: [resolve()]
    },
];
