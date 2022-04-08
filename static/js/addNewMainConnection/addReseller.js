import showMessage, { showError } from '../utility/showMessageAndError.js';

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
    showMessage('New reseller connection added successfully');
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
