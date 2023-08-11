
import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { BrowserRouter, Route, Redirect, Switch, HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import TopBar from '../components/TopBar';
import { render } from '@testing-library/react';
//hasrouter vs broweser router?
//HashRouter as Router
import { Authentication } from '../shared/AuthenticationContext';






class App extends React.Component {

  


  static contextType = Authentication;
  render() {
    const isLoggedIn = this.context.state.isLoggedIn;
    const username = undefined;
    
    return (
      <div >
        
        <HashRouter>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
            <Route path="/signup" component={UserSignupPage}/>
            <Route path="/user/:username" component={UserPage}/>
            <Redirect to="/" />
          </Switch>
        </HashRouter>
        
        {/*<LoginPage />   <HomePage /> <UserPage /> */}
        

        {/*
        <ApiProgress path="/api/1.0/auth">
          <LoginPage />
          UserSignupPage
        </ApiProgress>
        */}
        
        
      </div>
    );
  }
}

export default App;
