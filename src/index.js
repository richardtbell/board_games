import React from 'react'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import financeApp from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { addDataFromFirebase } from './actions/addDataFromFirebase'
import fire from './fire'
import firebase from 'firebase'
import { signIn } from './actions/signIn'
import { getUserDetails } from './utils'

const store = createStore(financeApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const usersRef = fire.database().ref('users').orderByKey().limitToLast(100);
const gamesRef = fire.database().ref('games').orderByKey().limitToLast(100);

firebase.auth().onAuthStateChanged(function (user) {
  if (user !== undefined) {
    store.dispatch(signIn(getUserDetails(user)))
  } else {
    // No user is signed in.
  }
});

usersRef.once('value', function (snapshot) {
  const snapValues = snapshot.val();
  if (snapValues) {
    const users = Object.keys(snapValues).map(id => {
      return { id: id, ...snapValues[id] }
    })
    store.dispatch(addDataFromFirebase({ users }))
  }
});

gamesRef.once('value', function (snapshot) {
  const snapValues = snapshot.val();
  if (snapValues) {
    const games = Object.keys(snapValues).map(id => {
      return { id: id, ...snapValues[id] }
    })
    store.dispatch(addDataFromFirebase({ games }))
  }
});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
