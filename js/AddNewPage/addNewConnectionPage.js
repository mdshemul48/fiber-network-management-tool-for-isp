import EditablePolyline from '../googleMap/editablePolyline.js';
import drawAndAddEventListener from './drawAndAddEventListener.js';
import submitFormData from './submitFormData.js';
import {
  submitPointToPointHandler,
  submitLocalHandler,
} from './submitNewConnection.js';

let map;
let editablePolyline;
let selectedPolyline = null;

// Create the script tag, set the appropriate attributes
const script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });

  editablePolyline = new EditablePolyline();
  editablePolyline.setMap(map);
  map.addListener('click', (event) => {
    const latLng = event.latLng;
    editablePolyline.addVertex(latLng);
  });

  // this will draw all the old polyline and will set an click listener on them
  drawAndAddEventListener(map, (clickedPolylineId, vertexKey) => {
    const latLng = clickedPolylineId.latLng;
    editablePolyline.addVertex(latLng);
    if (!selectedPolyline) {
      const connectedPolyline = document.getElementById('connectedPolyline');
      connectedPolyline.value = vertexKey;
      selectedPolyline = vertexKey;
    }
  });
};

document.getElementById('submit-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const { totalCore, connectionType } = submitFormData();
  const allCoordinates = editablePolyline.getAllThePath();
  if (selectedPolyline && connectionType === 'local') {
    submitLocalHandler(
      selectedPolyline,
      totalCore,
      connectionType,
      allCoordinates
    );
  } else if (!selectedPolyline && connectionType === 'pointToPoint') {
    submitPointToPointHandler(totalCore, connectionType, allCoordinates);
  }
});
// Append the 'script' element to 'head'
document.head.appendChild(script);
