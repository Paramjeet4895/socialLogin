import React from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey: "AIzaSyADCDtpPrUMJLoByO44 - fd442yFS7RGrjs",
  authDomain: "fir-6a9ff.firebaseapp.com"
})

class App extends React.Component{
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false 
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log(firebase.auth().currentUser)
    })
  }
  render() {
  return (
    <div className="App">
      {this.state.isSignedIn ? (
        <span>
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
          <h1>You are Signed In</h1>
          <h2>{firebase.auth().currentUser.displayName}</h2>
          <h3>{firebase.auth().currentUser.email}</h3>
          <img alt="profilepicture" src={firebase.auth().currentUser.photoURL}/>
        </span>
      ):(
        // <div>Not Signed In</div>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}/>
        )}
    </div>
  );
  }
}

export default App;
