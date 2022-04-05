import { showError } from '../utility/showMessageAndError.js';
import printHome from '../GoogleMap/printPolylineConnection/printHome.js';
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
  const response = await fetch('/api/home-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLocalConnection),
  });

  const responseJson = await response.json();
  const { status, data } = responseJson;
  if (status === 'success') {
    
  } else {
    const { errors, message } = responseJson;
    if (errors) {
      errors.forEach((item) => {
        showError(item.msg);
      });
    }

    if (message) {
      showError(message);
    }
  }
  return { status };
};
