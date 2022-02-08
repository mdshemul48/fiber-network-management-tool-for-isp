import Graph from '../storage/Graph.js';

const drawAllPolyline = (map) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();
  getAllThePath.forEach((item) => {
    const { allCoordinates } = item.nodeData;
    const polyline = new google.maps.Polyline({
      path: allCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    polyline.setMap(map);
  });
};

export default drawAllPolyline;
