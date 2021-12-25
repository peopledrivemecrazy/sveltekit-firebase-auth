import { initializeApp, getApp, getApps } from 'firebase/app';
import { browser } from '$app/env';
import {
	getAuth,
	signInWithCustomToken,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { currentUser, loading } from './store';
import { get } from 'svelte/store';
const firebaseConfig = {
	apiKey: 'AIzaSyBXFg1BdTjuzGWvBbe_aUaU0bdYSOnB9Ow',
	authDomain: 'auth-adc4b.firebaseapp.com',
	databaseURL: 'https://auth-adc4b.firebaseio.com',
	projectId: 'auth-adc4b',
	storageBucket: 'auth-adc4b.appspot.com',
	messagingSenderId: '244310740736',
	appId: '1:244310740736:web:fc2be157bdc94ad9e7ede5'
};

const firebaseApp: any =
	browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());

const loginWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;

			currentUser.set({
				user,
				loggedIn: true,
				uid: user.uid
			});
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
};

const logOut = async () => {
	const auth = getAuth();
	await signOut(auth)
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});
};

const authChanged = () => {
	const auth = getAuth();
	onAuthStateChanged(auth, async (user) => {
		// setPersistence(auth, browserSessionPersistence).then(() => signIn());

		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const uid = user.uid;
			// ...
			loading.set(true);
			currentUser.set({
				user,
				loggedIn: true,
				uid: user.uid
			});
		} else {
			// User is signed out
			// ...

			currentUser.set({
				user: null,
				loggedIn: false,
				uid: null
			});
		}
	});
};

export { firebaseApp, loginWithGoogle, logOut, authChanged };
