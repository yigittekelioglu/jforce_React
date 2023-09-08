import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { BrowserRouter, Route, Redirect, Switch, HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import TopBar from '../components/TopBar';
import AdminPage from '../pages/AdminPage';
import IkPage from '../pages/IkPage';
import InventoryPage from '../pages/InventoryPage';
import InventoryMasterPage  from '../pages/InventoryMasterPage'
import StaffPage from '../pages/StaffPage'; 
import { Authentication } from '../shared/AuthenticationContext';
import ProtectedRoute from '../shared/ProtectedRoute';
import InventoryAssignmentPage from '../pages/InventoryAssignmentPage';


//hasrouter vs broweser router?
//HashRouter as Router



class App extends React.Component {

  static contextType = Authentication;
  render() {
    const isLoggedIn = this.context.state.isLoggedIn;
    
    return (
      <div>
        <BrowserRouter>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
            <Route path="/signup" component={UserSignupPage}/>
            <Route path="/user/:username" component={UserPage}/>

            <ProtectedRoute path="/admin" component={AdminPage} role="ADMIN" />
            <ProtectedRoute path="/ik" component={IkPage} role="IK" />
            <ProtectedRoute path="/inventory" component={InventoryMasterPage} role="INVENTORYMASTER" />
            
            
            <ProtectedRoute path="/staffpage/:id?" component={StaffPage} role="IK" />
            <ProtectedRoute path="/inventorypage/:id?" component={InventoryPage} role="INVENTORYMASTER" />
            <ProtectedRoute path="/assignments/:id" component={InventoryAssignmentPage} role="IK" />



            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
