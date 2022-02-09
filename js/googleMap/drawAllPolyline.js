import Graph from '../storage/Graph.js';

const drawAllPolyline = (map) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();

  getAllThePath.forEach((item) => {
    const { nodeData, currentNode } = item;
    let { allCoordinates, connectionType, totalCore, usedCore } = nodeData;

    if (connectionType === 'pointToPoint' && !totalCore) {
      const mainPointToPointPolyline = (() => {
        function findPolyline(parentPolyline) {
          if (parentPolyline.nodeData.totalCore > 0) {
            return parentPolyline;
          }
          return findPolyline(graph.getVertexByKey(parentPolyline.prevNode));
        }
        return findPolyline(item);
      })();
      const { nodeData } = mainPointToPointPolyline;
      totalCore = nodeData.totalCore;
      usedCore = nodeData.usedCore;
    }

    const polyline = new google.maps.Polyline({
      path: allCoordinates,
      geodesic: true,
      strokeColor: connectionType === 'local' ? '#2EB086' : '#B8405E',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    const lengthInMeters = google.maps.geometry.spherical.computeLength(
      polyline.getPath()
    );
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <p class="mb-1">Type: ${connectionType}</p>
      ${
        totalCore
          ? `<p class="mb-1">Core Used: ${usedCore}/${totalCore}</p>`
          : ''
      }
      <p class="mb-1">Distance: ${Math.ceil(lengthInMeters)}m</p>

      <button class="badge badge-danger mb-1 bg-danger border-0" onClick="deleteConnection('${currentNode}')">Delete</button>
      `,
    });
    polyline.addListener('mouseover', (event) => {
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);
    });
    polyline.addListener('mouseout', () => {
      infoWindow.close();
    });
    polyline.setMap(map);
  });
};

export default drawAllPolyline;
