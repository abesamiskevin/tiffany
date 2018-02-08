const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

import executableSchema from '../schema';

const plugins = [
	{
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: { schema: executableSchema },
			route: { cors: true }
		}
	},
	{
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: { endpointURL: '/graphql' }
		}
	}
];

export default plugins;
