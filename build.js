const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const config = {
	input: 'src/server.js',
	output: {
		file: 'build/main.js',
		format: 'cjs'
	},
	plugins: [resolve(), commonjs()]
};

const build = async () => {
	let bundle = await rollup.rollup(config);
	bundle.write(config.output);
};

build();
