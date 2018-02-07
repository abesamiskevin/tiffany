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

export default getCalendar;
