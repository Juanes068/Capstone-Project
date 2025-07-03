import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);