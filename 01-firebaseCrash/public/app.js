// Init Firebase Authentication
const auth = firebase.auth()

// DOM Elements
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');

// * Create Path to Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();

// * Modal provided by auth
signInBtn.onclick = () => auth.signInWithPopup(provider).then(function (result) {
    // code which runs on success
}).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    console.log(errorCode);

    let errorMessage = error.message;
    console.log(errorMessage);
});

signOutBtn.addEventListener('click', () => auth.signOut());

// This Method Listens for Changes to User Authentication and Provides the User Object. This object has the same properties as those added to Indexed DB to show Auth User information
auth.onAuthStateChanged(user => {
    if (user) {
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `
            <h2>Hello ${user.displayName}<h2>
            <p>ID: ${user.uid}</p>    
        `
    } else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = ``
    }
});

// Database
const db = firebase.firestore();

const thingsList = document.getElementById('thingsList');
const createThing = document.getElementById('createThing');

// Data Will Continue to Stream In as We Access Our DB; We want to be able to turn that Off to Prevent Unneeded use and Cost
let thingsRef;
let unsubscribe;

const { serverTimestamp } = firebase.firestore.FieldValue;

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('whyyy');
        // create a connection to our DB
        thingsRef = db.collection('things');
        console.log(thingsRef);

        // * Event Listener
        createThing.addEventListener('click', (e) => {

            // .add() saves to our db
            thingsRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                // This method is more consistant than Date.now() accross devices
                createdAt: serverTimestamp()
            });
            unsubscribe = thingsRef
                // Query to collect all documents that are assossiated for this user
                .where('uid', '==', user.uid)
                // .get() will return the documents for us to use
                // ** Compound Queries - make multiple queries for this request
                // ** This will change the order we recive the data but will throw an error until a composit index is made. Follow the link in the error
                .orderBy('createdAt')
                // .onSnapshot will run a cb anytime the data changes for our query
                //	// In this case, our callback will run anytime there is a change to our user's things document
                .onSnapshot(querySnapshot => {
                    const items = querySnapshot.docs.map(doc => {
                        // We must use .data() to access the data within a document
                        return `<li>${doc.data().name}</li>`
                    });
                    thingsList.innerHTML = items.join('')
                });
        });

    } else {
        unsubscribe && unsubscribe()
    }

})