import { showError } from '../utility/showMessageAndError.js';
import printReseller from '../GoogleMap/printPolylineConnection/printReseller.js';

export default async (polylineKey, coordinates) => {
  const connectionName = $('#addLocalConnectionName').val();
  const oltSerialNumber = $('#addLocalConnectionOltSwitchNo').val();
  const portNo = $('#addLocalConnectionPortNo').val();
  const connectionType = $("input[name='addLocalConnectionType']")?.val();
  const color = $('#addLocalConnectionCoreOption').val();

  const newConnection = {
    parent: polylineKey,
    name: connectionName,
    oltSerialNumber,
    portNo,
    type: 'reseller',
    oltType: connectionType,
    coordinates,
    color,
  };
  const response = await fetch('/api/reseller-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newConnection),
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

    printReseller(data, window.targetMap, window.allTheConnection.length - 1);
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
