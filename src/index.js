import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './container/App';
import UserSignupPage from './pages/UserSignupPage';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import ApiProgress from './shared/ApiProgress';
import AuthenticationContext from './shared/AuthenticationContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthenticationContext>
    <App/>
  </AuthenticationContext>
  
  /*
  <React.StrictMode>
    <ApiProgress>
      <UserSignupPage />
    </ApiProgress>
  </React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
