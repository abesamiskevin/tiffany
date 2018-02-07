'use strict';

const admin = require('firebase-admin');

const serviceAccount = require('../tiffany-ddc643fed32d.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const getCalendar = async date => {
	let document = await db
		.collection('calendar')
		.doc(date)
		.get();

	return document.data().film;
};

const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
	type Film {
		title: String!
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

const { graphqlHapi } = require('apollo-server-hapi');

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
