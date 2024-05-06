import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const rootElement = ReactDOM.createRoot(root);
  rootElement.render(
    <React.StrictMode>
      <Router>
        <AuthProvider >
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
});
