const rollup = require('rollup');
const minify = require('rollup-plugin-babel-minify');

// see below for details on the options
const inputOptions = {
    input: './editor',
    plugins: [
        minify({
			comments: false
        })
    ]
};
const outputOptions = {
    file: './editor/editor.min.js',
    format: 'iife',
    sourcemap: true
};

async function build() {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

build();
