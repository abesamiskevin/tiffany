'use strict';

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
	keyFilename: 'tiffany.json'
});

const getCalendar = async date => {
	let document = await firestore
		.collection('calendar')
		.doc(date)
		.get();

	return document.data().film;
};

const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
	type Film {
		id: Int
		title: String
		director: String
		showtime: [String]
	}

	type Query {
		calendar(date: String!): [Film]
	}
`;

const resolvers = {
	Query: {
		calendar: (_, { date }) => getCalendar(date)
	}
};

var executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

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

const Hapi = require('hapi');

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
