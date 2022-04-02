import printPointToPointConnection from './printPolylineConnection/printPointToPoint.js';
import printCorporateConnection from './printPolylineConnection/printCorporateConnection.js';
import printResellerConnection from './printPolylineConnection/printReseller.js';
import printLocalFiberConnection from './printPolylineConnection/printLocalFiber.js';
import printHomeConnection from './printPolylineConnection/printHome.js';
import printLocalSplitter from './printPolylineConnection/printLocalSplitter.js';

const printAllThePolylines = async (map) => {
  const response = await fetch('/api/getAllConnection');
  const { data: allThePath } = await response.json();

  window.allTheConnection = allThePath;

  allThePath.forEach((connection) => {
    if (connection.type === 'pointToPoint')
      printPointToPointConnection(connection, map);
    else if (connection.type === 'corporate')
      printCorporateConnection(connection, map);
    else if (connection.type === 'reseller')
      printResellerConnection(connection, map);
    else if (connection.type === 'localFiber')
      printLocalFiberConnection(connection, map);
    else if (connection.type === 'splitter')
      printLocalSplitter(connection, map);
    else if (connection.type === 'home') printHomeConnection(connection, map);
  });
};

export default printAllThePolylines;
