import Graph from '../storage/Graph.js';

const drawAndAddEventListener = (map, callback) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();
  getAllThePath.forEach((item) => {
    console.log(item);
    const { currentNode, nodeData } = item;
    const { allCoordinates, connectionType } = nodeData;
    const polyline = new google.maps.Polyline({
      path: allCoordinates,
      geodesic: true,
      strokeColor: connectionType === 'local' ? '#2EB086' : '#B8405E',
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
    polyline.setMap(map);
    polyline.addListener('click', (event) => {
      callback(event, currentNode);
    });
  });
};

export default drawAndAddEventListener;
