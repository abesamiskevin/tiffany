const { graphqlHapi } = require('apollo-server-hapi');

import executableSchema from '../schema';

const plugins = [
	{
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: { schema: executableSchema },
			route: { cors: true }
		}
	}
];

export default plugins;
