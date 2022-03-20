import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default async (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalHomeConnectionName'
  ).value;
  const onuNo = document.getElementById('addLocalHomeConnectionOnuNo').value;
  const coreOption = document.getElementById(
    'addLocalHomeConnectionOptions'
  ).value;

  const newLocalConnection = {
    parent: polylineKey,
    name: connectionName,
    coordinates,
    onuNo,
    color: coreOption,
  };
  const response = await fetch('/api/create-home-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLocalConnection),
  });

  const text = await response.text();
  location.reload();
};
