const Hapi = require('hapi');

import plugins from './config/plugins';

const server = Hapi.server({
	host: 'localhost',
	port: 3000
});

const start = async () => {
	await server.register(plugins);
	await server.start();
	console.log('Server running at:', server.info.uri);
};

start();
