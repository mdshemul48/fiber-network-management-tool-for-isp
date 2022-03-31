import { showError } from '../utility/showMessageAndError.js';

export default async (polylineKey, coordinates) => {
  const companyName = document.getElementById(
    'addPointToPointCompanyName'
  ).value;
  const portNo = document.getElementById('addPointToPointPortNo').value;
  const coreColor = document.getElementById('addPointToPointCoreOptions').value;

  const pointToPointPolyline = {
    parent: polylineKey,
    name: companyName,
    portNo,
    coreColor,
    coordinates,
  };

  const response = await fetch('/api/corporate-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pointToPointPolyline),
  });
  const responseJson = await response.json();
  const { status } = responseJson;
  if (status === 'success') {
    location.reload();
  } else {
    const { errors, message } = responseJson;
    console.log(message);
    if (errors) {
      errors.forEach((item) => {
        showError(item.msg);
      });
    }

    if (message) {
      showError(message);
    }
  }
};
