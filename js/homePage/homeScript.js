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

  const targetVertex = graph.getVertexByKey(vertexKey);

  const confirmValue = confirm('Are you sure you want to disable?');
  if (confirmValue) {
    (function disableAllTheChildConnection(headNode) {
      headNode.nodeData.status = 'disabled';
      for (let i = 0; i < headNode.children.length; i++) {
        disableAllTheChildConnection(
          graph.getVertexByKey(headNode.children[i])
        );
      }
    })(targetVertex);

    localStorage.setItem('siteData', JSON.stringify(graph));
    location.reload();
  }
};

window.enableConnection = (vertexKey) => {
  const localData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(localData);

  const targetVertex = graph.getVertexByKey(vertexKey);
  const confirmValue = confirm('Are you sure you want to enable?');
  if (confirmValue) {
    (function disableAllTheChildConnection(headNode) {
      headNode.nodeData.status = 'active';
      for (let i = 0; i < headNode.children.length; i++) {
        disableAllTheChildConnection(
          graph.getVertexByKey(headNode.children[i])
        );
      }
    })(targetVertex);

    localStorage.setItem('siteData', JSON.stringify(graph));
    location.reload();
  }
};

window.updatePolylineButton = (vertexKey) => {
  const localData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(localData);
  const targetVertex = graph.getVertexByKey(vertexKey);
  console.log(targetVertex);
  if (targetVertex.children.length > 0) {
    alert(
      "You can't update connection with it children connection. First delete all the children connection and then you can update."
    );
  } else {
    location.href = `/updateConnection.html?polylineKey=${vertexKey}`;
  }
};

document.head.appendChild(script);
