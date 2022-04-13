import Map from './components/Map/Map';
import PrintAllConnection from './components/Polylines/PrintAllConnection';
import { LoadScript } from '@react-google-maps/api';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className='App'>
      <Map libraries='spherical'>
        <PrintAllConnection />
      </Map>
    </div>
  );
}

export default App;
