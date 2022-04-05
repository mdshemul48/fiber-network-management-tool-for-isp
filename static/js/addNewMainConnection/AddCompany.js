import { showError } from '../utility/showMessageAndError.js';
import printCorporateConnection from '../GoogleMap/printPolylineConnection/printCorporateConnection.js';
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
  const { status, data } = responseJson;
  if (status === 'success') {
    window.allTheConnection.push(data);
    // pushing to parent childrens data
    const findIndex = window.allTheConnection.findIndex(
      (item) => item._id === data.parent
    );

    if (findIndex !== -1) {
      window.allTheConnection[findIndex].childrens.push({
        color: data.color,
        connectionType: data.type,
        portNo,
        child: data._id,
      });
    }

    printCorporateConnection(
      data,
      window.targetMap,
      window.allTheConnection.length - 1
    );
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
