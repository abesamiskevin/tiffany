const { makeExecutableSchema } = require('graphql-tools');

import getCalendar from './calendar';

const typeDefs = `
	type Film {
		title: String
		director: String
		showtime: [String]
	}

	type Query {
		calendar: [Film]
	}
`;

const resolvers = {
	Query: {
		calendar: () => getCalendar('2018-02-08')
	}
};

export default makeExecutableSchema({
	typeDefs,
	resolvers
});
