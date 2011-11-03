var
	mongodb = require('mongodb'),
	client = new mongodb.Db('ContactBook', new mongodb.Server('127.0.0.1', 27017, {})),
	async = require('async');

client.open(function(error, client) {

	function onCollection(error, collection) {

		function addContact(contact, callback) {
			collection.insert(contact, function(error, items) {
				if (callback) {
					callback(error, items[0]);
				}
			});
		}

		async.forEach([

			{ name: 'Paul Serby', emailAddress: 'paul.serby@clock.co.uk'},
			{ name: 'Syd Nadim', emailAddress: 'syd.nadim@clock.co.uk'}

		], addContact, function(error) {
			listAll(function() {
				client.close();
			});
		});

		function listAll(callback) {
			collection.find({}).toArray(function(error, contacts) {
				contacts.forEach(function(contact) {
					console.log(contact);
				});
				callback();
			});
		}
	}

	client.collection('contact', onCollection);
});