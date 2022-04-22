import { Toaster } from 'react-hot-toast';

import Map from './components/Map/Map';
import PrintAllConnection from './components/Polylines/PrintAllConnection';
import Submit from './components/SubmitForm/Submit';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className='App'>
      <Map>
        <Toaster />
        <Submit />
        <PrintAllConnection />
      </Map>
    </div>
  );
}

export default App;
