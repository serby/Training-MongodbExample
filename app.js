var
	mongodb = require('mongodb'),
	client = new mongodb.Db('ContactBook', new mongodb.Server('127.0.0.1', 27017, {}));

function onCollection(err, collection) {

	function addContact(contact, callback) {
		collection.insert(contact, function(error, items) {
			if (callback) {
				callback(error, items[0]);
			}
		});
	}

	addContact({ name: 'Paul Serby', emailAddress: 'paul.serby@clock.co.uk'});
	addContact({ name: 'Syd Nadim', emailAddress: 'syd.nadim@clock.co.uk'});
}

client.open(function(error, client) {
	client.collection('contact', onCollection);
});