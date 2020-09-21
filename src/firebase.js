import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCys96alEHDzLDfIUf3E_9LJqHEMxdOu7Q",
	authDomain: "clone-c22ce.firebaseapp.com",
	databaseURL: "https://clone-c22ce.firebaseio.com",
	projectId: "clone-c22ce",
	storageBucket: "clone-c22ce.appspot.com",
	messagingSenderId: "562056985111",
	appId: "1:562056985111:web:dc04c501054057aba2ba52",
	measurementId: "G-3KQR303DCT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
