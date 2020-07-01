import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer, createFirestoreInstance } from 'redux-firestore';

import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
	apiKey: "AIzaSyCzlcX90DcjDmflkLLO0m3p1hU4Dwe7WJg",
	authDomain: "reactclientpanel-e6641.firebaseapp.com",
	databaseURL: "https://reactclientpanel-e6641.firebaseio.com",
	projectId: "reactclientpanel-e6641",
	storageBucket: "reactclientpanel-e6641.appspot.com",
	messagingSenderId: "541465041148",
	appId: "1:541465041148:web:08991d80009f24b9"
};

// react-redux-firebase config
const rrfConfig = {
	userFirestoreForProfile: true // firestore for Profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);
// init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true};
// firestore.settings(settings); 


const createStoreWithFirebase = reduxFirestore(firebase)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
	notify: notifyReducer,
	settings: settingsReducer
});

// Check for settings in local storage
if(localStorage.getItem('settings') == null) {
	// Default settings
	const defaultSettings = {
		disableBalanceOnAdd: true,
		disableBalanceOnEdit: false,
		allowRegistration: false
	}
	// Set to local storage
	localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create inital state
const initalState = {settings: JSON.parse(localStorage.getItem('settings'))};

const store = createStoreWithFirebase(rootReducer, initalState, compose(
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export const rrfProps = {
  firebase,
  config: rrfConfig,
	dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default store;