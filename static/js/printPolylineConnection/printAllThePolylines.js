import printPointToPointConnection from './printPointToPoint.js';
import printCorporateConnection from './printCorporateConnection.js';
import printResellerConnection from './printReseller.js';
import printLocalFiberConnection from './printLocalFiber.js';
import printHomeConnection from './printHome.js';
import printLocalSplitter from './printLocalSplitter.js';

const printAllThePolylines = async () => {
  const map = window.targetMap;

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
