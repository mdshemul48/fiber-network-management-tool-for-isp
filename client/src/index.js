import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MapContext } from './context/MapContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MapContext>
      <App />
    </MapContext>
  </React.StrictMode>
);
