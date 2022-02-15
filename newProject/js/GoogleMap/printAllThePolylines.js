import Graph from '../storage/Graph.js';

import printMainConnection from './printPolylineConnection/printMainConnection.js';
import printMainLocalConnection from './printPolylineConnection/printMainLocalConnection.js';
import printPointToPointConnection from './printPolylineConnection/printPointToPointConnection.js';

const printAllThePolylines = (map) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();

  getAllThePath.forEach((connection) => {
    if (connection.connectionType === 'mainConnection')
      printMainConnection(connection, map);
    else if (connection.connectionType === 'PointToPoint')
      printPointToPointConnection(connection, map);
    else if (connection.connectionType === 'mainLocal')
      printMainLocalConnection(connection, map);
  });
};

export default printAllThePolylines;
