const { makeExecutableSchema } = require('graphql-tools');

import getCalendar from './calendar';

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

export default makeExecutableSchema({
	typeDefs,
	resolvers
});
