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

// ! testing shortest route here

// get point on polyline
const getPointOnPolyline = (coordinates, targetPoint) => {
  const point = turf.point(targetPoint);
  const line = turf.lineString(coordinates);
  const snapped = turf.pointOnLine(line, point);

  const pstnOnLine = {
    lat: snapped.geometry.coordinates[1],
    lng: snapped.geometry.coordinates[0],
  };
  return pstnOnLine;
};

document.getElementById('triggerButton').addEventListener('click', async () => {
  const polylineCoordinates = editablePolyline.polyline.getPath();
  const { lat, lng } = polylineCoordinates.getAt(0);
  const latLng = { lat: lat(), lng: lng() };
  const response = await fetch(
    '/api/ptp-connection?coordinates=' + JSON.stringify(latLng)
  );
  const { status, data } = await response.json();

  if (status === 'success') {
    const {
      location: { coordinates },
    } = data;

    const pointOnLine = getPointOnPolyline(coordinates, [
      latLng.lng,
      latLng.lat,
    ]);

    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: new google.maps.LatLng(pointOnLine.lat, pointOnLine.lng),
      destination: polylineCoordinates.getAt(0),
      travelMode: 'WALKING',
    };

    await directionsService.route(request, async function (result, status) {
      if (status === 'OK') {
        const allSteps = result.routes[0].legs[0].steps;

        let shortestDistance = +Infinity;
        let shortestPath = null;

        for (let step of allSteps) {
          const { lat, lng } = getPointOnPolyline(coordinates, [
            step.start_location.lng(),
            step.start_location.lat(),
          ]);

          const request = {
            origin: new google.maps.LatLng(lat, lng),
            destination: polylineCoordinates.getAt(0),
            travelMode: 'WALKING',
          };
          await directionsService.route(request, async (result, status) => {
            if (status === 'OK') {
              const {
                distance: { value },
              } = result.routes[0].legs[0];

              if (value < shortestDistance) {
                shortestDistance = value;
                shortestPath = result;
              }
            }
          });
        }

        const {
          routes: [{ overview_path: path }],
        } = shortestPath;

        const { lat, lng } = getPointOnPolyline(coordinates, [
          path[0].lng(),
          path[0].lat(),
        ]);

        const startPoint = new google.maps.LatLng(lat, lng);
        const endPoint = polylineCoordinates.getAt(0);

        const polylineEstimatedPath = [startPoint, ...path, endPoint];

        const polyline = new google.maps.Polyline({
          path: polylineEstimatedPath,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 3,
        });

        polyline.setMap(window.targetMap);
      }
    });
  }
});

// ! -----------------------------------

// all the delete functions
window.deleteHomeConnection = deleteHomeConnection;
window.deleteSplitterConnection = deleteSplitterConnection;
window.deleteMainLocalConnection = deleteMainLocalConnection;
