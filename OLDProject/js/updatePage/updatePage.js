import Graph from '../storage/Graph.js';
import EditablePolyline from '../googleMap/editablePolyline.js';

let map = null;
let editablePolyline = null;
let targetPolylineObj = null;
const getPolylineKey = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const targetPolyline = urlParams.get('polylineKey');
  return targetPolyline;
};

function importGoogleMapApi() {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&callback=initMap';
  script.async = true;
  document.head.appendChild(script);
}
importGoogleMapApi();

const loadingTargetPolyline = (polylineKey) => {
  const localStoredData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(localStoredData);
  const targetPolyline = graph.getVertexByKey(polylineKey);
  return targetPolyline;
};

window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });
  // getting vertex key from url
  const targetPolylineKey = getPolylineKey();
  targetPolylineObj = loadingTargetPolyline(targetPolylineKey);

  editablePolyline = new EditablePolyline(
    targetPolylineObj.nodeData.allCoordinates
  );
  editablePolyline.setMap(map);
  map.addListener('click', (event) => {
    const latLng = event.latLng;
    editablePolyline.addVertex(latLng);
  });
};
