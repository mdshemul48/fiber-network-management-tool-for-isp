import EditablePolyline from './GoogleMap/EditablePolyline.js';
import printAllThePolylines from './GoogleMap/printAllThePolylines.js';

// all the from submit functions
import addNewMainConnection from './addNewMainConnection/addNewMainConnection.js';
import addPointToPoint from './addNewMainConnection/AddPointToPoint.js';
import addMainLocalConnection from './addNewMainConnection/addMainLocalConnection.js';
import addLocalSplitter from './addNewMainConnection/addLocalSplitter.js';
import addLocalHomeConnection from './addNewMainConnection/addLocalHomeConnection.js';
import addLocalFiberConnection from './addNewMainConnection/addLocalFiberConnection.js';

// all the delete functions
import deleteHomeConnection from './deletePolyline/deleteHomeConnection.js';
import deleteSplitterConnection from './deletePolyline/deleteSplitterConnection.js';
import deleteMainLocalConnection from './deletePolyline/deleteMainLocalConnection.js';

let map;
let editablePolyline;
let selectedPolyline = null;
let selectedPolylineType = null;

const insertScript = () => {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDL9422bxk3GtU5z54qo2Sg-JrrSn5RGcE&libraries=geometry&callback=initMap';
  script.async = true;
  document.head.appendChild(script);
};
insertScript();

window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });
  window.targetMap = map;
  editablePolyline = new EditablePolyline();

  map.addListener('click', (event) => {
    editablePolyline.addVertex(event.latLng);
  });

  editablePolyline.setMap(map);

  printAllThePolylines(map);
};
// this will called when the user will click on new polyline
window.selectPolyline = (latLng, { _id, type }) => {
  if (!selectedPolyline) {
    Toastify({
      text: `You have selected ${type} connection!`,
      duration: 3000,
      // close: true,
      gravity: 'top',
      position: 'center',
      stopOnFocus: true,
      style: {
        color: 'white',
        background: 'black',
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    editablePolyline.addVertex(latLng);
    selectedPolyline = _id;
    selectedPolylineType = type;
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

document
  .getElementById('addMainLocalSubmission')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    addMainLocalConnection(selectedPolyline, editablePolyline.getAllThePath());
  });

document
  .getElementById('addLocalSplitterSubmission')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    addLocalSplitter(
      selectedPolyline,
      selectedPolylineType,
      editablePolyline.getAllThePath()
    );
  });

document
  .getElementById('addLocalHomeConnectionSubmit')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    addLocalHomeConnection(selectedPolyline, editablePolyline.getAllThePath());
  });

document
  .getElementById('addLocalFiberConnection')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    addLocalFiberConnection(
      selectedPolyline,
      selectedPolylineType,
      editablePolyline.getAllThePath()
    );
  });

// all the delete functions
window.deleteHomeConnection = deleteHomeConnection;
window.deleteSplitterConnection = deleteSplitterConnection;
window.deleteMainLocalConnection = deleteMainLocalConnection;

// const savedData = JSON.parse(localStorage.getItem('siteData'));
// const graph = new Graph(savedData);
// console.log(
//   graph
//     .getVertexByKey('91224ad8-9194-46bf-8820-0b97f7e43e99')
//     .coordinates.map((item) => [item.lng, item.lat])
// );
// var line = turf.lineString(
//   graph
//     .getVertexByKey('91224ad8-9194-46bf-8820-0b97f7e43e99')
//     .coordinates.map((item) => [item.lng, item.lat])
// );
// console.log(editablePolyline.polyline.getPath().Ed[0].lat());
// var pt = turf.point([
//   editablePolyline.polyline.getPath().Ed[0].lng(),
//   editablePolyline.polyline.getPath().Ed[0].lat(),
// ]);
// var snapped = turf.pointOnLine(line, pt);

// var pstnOnLine = {
//   lat: snapped.geometry.coordinates[1],
//   lng: snapped.geometry.coordinates[0],
// };
// var distToLine = snapped.properties.dist;
// new google.maps.Marker({
//   position: pstnOnLine,
//   map,
//   title: 'Hello World!',
// });
