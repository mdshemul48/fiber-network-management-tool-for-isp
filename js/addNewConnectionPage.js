import EditablePolyline from './googleMap/editablePolyline.js';
// import database from './storage/fakeDatabase.js';

let map;
let polyline;

// Create the script tag, set the appropriate attributes
const script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  const polyline = new EditablePolyline();
  polyline.setMap(map);
  map.addListener('click', (event) => {
    const latLng = event.latLng;
    polyline.addVertex(latLng);
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
