import Graph from '../storage/Graph.js';

const drawAllPolyline = (map) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();
  getAllThePath.forEach((item) => {
    const { allCoordinates, connectionType } = item.nodeData;
    const polyline = new google.maps.Polyline({
      path: allCoordinates,
      geodesic: true,
      strokeColor: connectionType === 'local' ? '#2EB086' : '#B8405E',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    polyline.setMap(map);
  });
};

export default drawAllPolyline;
