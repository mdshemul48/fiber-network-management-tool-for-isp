import Graph from '../storage/Graph.js';

import printMainConnection from './printPolylineConnection/printMainConnection.js';

const printAllThePolylines = (map) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();

  getAllThePath.forEach((connection) => {
    if (connection.connectionType === 'mainConnection')
      printMainConnection(connection, map);
    else if (true);
  });
};

export default printAllThePolylines;
