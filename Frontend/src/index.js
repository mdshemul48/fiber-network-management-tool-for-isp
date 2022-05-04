import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MapContext } from "./context/MapContext";
import { EditableContextProvider } from "./context/EditablePolylineContext";
import { PolylinesContextProvider } from "./context/PolylinesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MapContext>
      <PolylinesContextProvider>
        <EditableContextProvider>
          <App />
        </EditableContextProvider>
      </PolylinesContextProvider>
    </MapContext>
  </React.StrictMode>
);
