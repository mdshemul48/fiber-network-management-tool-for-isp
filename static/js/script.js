import getShortestPath from './utility/getShortestPath.js';

import EditablePolyline from './GoogleMap/EditablePolyline.js';
import printAllThePolylines from './GoogleMap/printAllThePolylines.js';

// all the from submit functions
import addReseller from './addNewMainConnection/addReseller.js';
import AddCompany from './addNewMainConnection/AddCompany.js';
import addPointToPoint from './addNewMainConnection/addPointToPoint.js';
import addLocalSplitter from './addNewMainConnection/addLocalSplitter.js';
import addLocalHomeConnection from './addNewMainConnection/addLocalHomeConnection.js';
import addLocalFiberConnection from './addNewMainConnection/addLocalFiberConnection.js';

import deleteConnection from './deletePolyline/deleteConnection.js';

let map;
let editablePolyline;
let selectedPolyline = null;
let selectedPolylineType = null;
let clickEvent = null;

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

  clickEvent = map.addListener('click', (event) => {
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
    addReseller(polylineCoordinates);
  });

document
  .getElementById('addPointToPoint')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    AddCompany(selectedPolyline, editablePolyline.getAllThePath());
  });

document
  .getElementById('addMainLocalSubmission')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    addPointToPoint(selectedPolyline, editablePolyline.getAllThePath());
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

// ! testing shortest route here

document.getElementById('triggerButton').addEventListener('click', async () => {
  const polylineCoordinates = editablePolyline.polyline.getPath();
  const point = polylineCoordinates.getAt(0);

  const response = await fetch(
    '/api/ptp-connection?coordinates=' +
      JSON.stringify({ lat: point.lat(), lng: point.lng() })
  );

  const { status, data } = await response.json();

  if (status === 'success') {
    const {
      location: { coordinates },
    } = data;

    getShortestPath(coordinates, point, (result) => {
      const polylineEstimatedPath = result;
      // deleting prev polyline
      google.maps.event.removeListener(clickEvent);
      editablePolyline.setMap(null);
      // creating new polyline
      editablePolyline = new EditablePolyline();
      editablePolyline.setMap(window.targetMap);
      // adding new event listener
      clickEvent = window.targetMap.addListener('click', (event) => {
        editablePolyline.addVertex(event.latLng);
      });
      // this will animate polyline
      for (let i = 0; i < polylineEstimatedPath.length; i++) {
        setTimeout(
          function (coords) {
            editablePolyline.addVertex(coords);
          },
          200 * i,
          polylineEstimatedPath[i]
        );
      }
      // setting parent data
      const { _id, type } = data;
      selectedPolyline = _id;
      selectedPolylineType = type;
    });
  }
});

// ! -----------------------------------

window.deleteConnection = deleteConnection;
