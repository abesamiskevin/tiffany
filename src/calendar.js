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

export default getCalendar;
