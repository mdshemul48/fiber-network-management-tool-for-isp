import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default async (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalHomeConnectionName'
  ).value;
  const OnuNo = document.getElementById('addLocalHomeConnectionOnuNo').value;
  const coreOption = document.getElementById(
    'addLocalHomeConnectionOptions'
  ).value;

  const newLocalConnection = {
    connectionName,
    connectionType: 'localHome',
    coordinates,
    OnuNo,
    CoreColor: coreOption,
  };
  const response = await fetch('/api/addNewLocalConnection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLocalConnection),
  });

  const text = await response.text();
  console.log(text);

  // location.reload();
};
