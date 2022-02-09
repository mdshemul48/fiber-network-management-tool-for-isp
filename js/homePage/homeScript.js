import drawAllPolyline from '../googleMap/drawAllPolyline.js';
import Graph from '../storage/Graph.js';

let map;

const script = document.createElement('script');
script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&libraries=geometry&callback=initMap';
script.async = true;

window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });
  drawAllPolyline(map);
};

window.deleteConnection = (vertexKey) => {
  const localData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(localData);

  const targetVertex = graph.getVertexByKey(vertexKey);
  if (targetVertex.children.length >= 1) {
    alert(
      "You can't delete connection with it child connected. please delete child connection first."
    );
    return;
  }

  const confirmValue = confirm('Are you sure you want to delete?');
  if (confirmValue) {
    graph.deleteVertex(vertexKey);
    localStorage.setItem('siteData', JSON.stringify(graph));
    location.reload();
  }
};

window.disableConnection = (vertexKey) => {
  const localData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(localData);
};

document.head.appendChild(script);
