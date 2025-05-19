import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '84082780273-crh07ri3er1tsrbff5jksodh2pl2q1no.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
      
      <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
