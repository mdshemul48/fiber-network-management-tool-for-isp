import EditablePolyline from './googleMap/editablePolyline.js';
import submitFormData from './submitFormData.js';
import submitNewHandler from './submitNewConnection.js';

let map;
let editablePolyline;

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
};

document.getElementById('submit-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const { totalCore, connectionType } = submitFormData();
  const path = editablePolyline.polyline.getPath();
  const allCoordinatesFunctions = path.xd;
  const allCoordinates = allCoordinatesFunctions.map(({ lat, lng }) => ({
    lat: lat(),
    lng: lng(),
  }));
  console.log(allCoordinates);
});
// Append the 'script' element to 'head'
document.head.appendChild(script);
