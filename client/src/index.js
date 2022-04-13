import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MapContext } from './context/MapContext';
import { EditableContextProvider } from './context/EditablePolylineContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MapContext>
      <EditableContextProvider>
        <App />
      </EditableContextProvider>
    </MapContext>
  </React.StrictMode>
);
