import { Toaster } from "react-hot-toast";

import Map from "./components/Map/Map";
import PrintAllConnection from "./components/Polylines/PrintAllConnection";
import Submit from "./components/SubmitForm/Submit";

import "bootstrap/dist/css/bootstrap.min.css";
import NearbyConnection from "./components/NearbyConnection/NearbyConnection";
function App() {
  return (
    <div className="App">
      <Map>
        <NearbyConnection />
        <Toaster />
        <Submit />
        <PrintAllConnection />
      </Map>
    </div>
  );
}

export default App;
