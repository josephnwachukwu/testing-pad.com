const functions = require('firebase-functions');
const a11y = require('a11y');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.accessibility = functions.https.onRequest((request, response) => {
	console.log(request.body.site)
	// Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s

  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
  	a11y(request.body.site, (err, reports) => {
  		if(err) {
	    	console.log(err)
	    }
  		console.log("reports", reports)
	    const audit = reports.audit; // `a11y` Formatted report
	    const report = reports.report; // DevTools Accessibility Audit formatted report
	    if(err) {
	    	console.log(err)
	    }
	    response.send(JSON.stringify(audit));
	})
  }
});