import Graph from '../storage/Graph.js';
import coreColor from '../utility/coreColor.js';
import uuidv4 from '../utility/uuid.js';

export default async (polylineKey, polylineType, coordinates) => {
  const connectionName = document.getElementById('addLocalSplitterName').value;
  const localSplitterPortNo = Number(
    document.getElementById('addLocalSplitterPortNo').value
  );
  const localSplitterType = Number(
    document.getElementById('addLocalSplitterType').value
  );

  const connectedCoreColor = document.getElementById(
    'addLocalSplitterConnection'
  ).value;

  const newSplitterConnection = {
    parentType: polylineType,
    parent: polylineKey,
    name: connectionName,
    coordinates,
    splitterLimit: localSplitterType,
    color: connectedCoreColor,
    portNo: localSplitterPortNo,
  };

  const response = await fetch('/api/create-splitter-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(newSplitterConnection),
  });
  const data = await response.text();
  console.log(data);
};
