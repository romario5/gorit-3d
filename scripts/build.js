const rollup = require('rollup');
const minify = require('rollup-plugin-babel-minify');

// see below for details on the options
const inputOptions = {
    input: './src/index.js',
    plugins: [
        minify({
			comments: false
        })
    ]
};
const outputOptions = {
    file: './dst/nat-3d.min.js',
    format: 'iife',
    sourcemap: true
};

async function build() {
    const bundle = await rollup.rollup(inputOptions).catch(error => {
        console.error(error);
    });
    await bundle.write(outputOptions);
}

build();
