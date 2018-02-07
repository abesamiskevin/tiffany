import resolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/server.js',
	output: {
		file: 'build/main.js',
		format: 'cjs'
	},
	plugins: [resolve()]
};
