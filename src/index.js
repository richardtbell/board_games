import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import financeApp from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { addDataFromFirebase } from './actions/addDataFromFirebase'
import fire from './db/fire'
import firebase from 'firebase'
import { signIn } from './actions/signIn'
import { getUserDetails } from './utils'
import { Redirect } from 'react-router-dom';

const store = createStore(financeApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const usersRef = fire.database().ref('users');
const gamesRef = fire.database().ref('games');

class Index extends Component {
  state = {
    signedIn: true,
    loading: true
  }

  componentDidMount() {
    const that = this
    const reAuth = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user !== null) {
          store.dispatch(signIn(getUserDetails(user)))
          that.setState({ signedIn: true })
        } else {
          that.setState({ signedIn: false })
        }
        resolve()
      });
    })

    const getUserValues = new Promise((resolve, reject) => {
      usersRef.once('value', function (snapshot) {
        const snapValues = snapshot.val();
        if (snapValues) {
          const users = Object.keys(snapValues).map(id => {
            return { id: id, ...snapValues[id] }
          })
          store.dispatch(addDataFromFirebase({ users }))
          resolve()
        }
      });
    })

    const getGamesValues = new Promise((resolve, reject) => {
      gamesRef.once('value', function (snapshot) {
        const snapValues = snapshot.val();
        if (snapValues) {
          const games = Object.keys(snapValues).map(id => {
            return { id: id, ...snapValues[id] }
          })
          store.dispatch(addDataFromFirebase({ games }))
          resolve()
        }
      });
    })
    Promise.all([reAuth, getUserValues, getGamesValues]).then(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    let app = <p>loading...</p>
    if (!this.state.signedIn) {
      app = <div><App /><Redirect to='/signin' /></div>
    }
    if (!this.state.loading) {
      app = <App />
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
          {app}
        </BrowserRouter>
      </Provider>
    )

  }
}


ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
