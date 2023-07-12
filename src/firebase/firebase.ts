// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB6IrHFX5x-FDKHajc1GbbhaZz-c6C1kJ4',
	authDomain: 'vehicle-reg-3b499.firebaseapp.com',
	projectId: 'vehicle-reg-3b499',
	storageBucket: 'vehicle-reg-3b499.appspot.com',
	messagingSenderId: '230185200005',
	appId: '1:230185200005:web:e5aa474355739fa6293cec',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

export { firestore, app };
