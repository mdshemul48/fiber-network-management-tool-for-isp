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

  window.allTheConnection.forEach((connection, index) => {
    if (connection.type === 'pointToPoint')
      printPointToPointConnection(connection, map, index);
    else if (connection.type === 'corporate')
      printCorporateConnection(connection, map, index);
    else if (connection.type === 'reseller')
      printResellerConnection(connection, map, index);
    else if (connection.type === 'localFiber')
      printLocalFiberConnection(connection, map, index);
    else if (connection.type === 'splitter')
      printLocalSplitter(connection, map, index);
    else if (connection.type === 'home')
      printHomeConnection(connection, map, index);
  });
};

export default printAllThePolylines;
