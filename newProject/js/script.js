import EditablePolyline from './GoogleMap/EditablePolyline.js';
import printAllThePolylines from './GoogleMap/printAllThePolylines.js';

// all the from submit functions
import addNewMainConnection from './addNewMainConnection/addNewMainConnection.js';
import addPointToPoint from './addNewMainConnection/AddPointToPoint.js';

let map;
let editablePolyline;
let selectedPolyline = null;

const insertScript = () => {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&libraries=geometry&callback=initMap';
  script.async = true;
  document.head.appendChild(script);
};
insertScript();

window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });

  editablePolyline = new EditablePolyline();

  map.addListener('click', (event) => {
    editablePolyline.addVertex(event.latLng);
  });

  editablePolyline.setMap(map);

  printAllThePolylines(map);
};
// this will called when the user will click on new polyline
window.selectPolyline = (latLng, polylineId) => {
  if (!selectedPolyline) {
    editablePolyline.addVertex(latLng);
    selectedPolyline = polylineId;
  }
};

// all the connections form
document
  .getElementById('newMainConnectionForm')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    const polylineCoordinates = editablePolyline.getAllThePath();
    addNewMainConnection(polylineCoordinates);
  });

document
  .getElementById('addPointToPoint')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    addPointToPoint(selectedPolyline, editablePolyline.getAllThePath());
  });
