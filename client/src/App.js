import Map from './components/Map/Map';
import PrintAllConnection from './components/Polylines/PrintAllConnection';
import Submit from './components/SubmitForm/Submit';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className='App'>
      <Map>
        <Submit />
        <PrintAllConnection />
      </Map>
    </div>
  );
}

export default App;
