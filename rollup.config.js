import resolve from 'rollup-plugin-node-resolve';

export default [
    {
        input: 'test/index.js',
        output: {
            file: 'test/index-bundle.js',
            format: 'iife'
        },
        plugins: [resolve()]
    },
    {
        input: 'test/form.js',
        output: {
            file: 'test/form-bundle.js',
            format: 'iife'
        },
        plugins: [resolve()]
    },
    {
        input: 'test/bootstrap.js',
        output: {
            file: 'test/bootstrap-bundle.js',
            format: 'iife'
        },
        plugins: [resolve()]
    },
];
