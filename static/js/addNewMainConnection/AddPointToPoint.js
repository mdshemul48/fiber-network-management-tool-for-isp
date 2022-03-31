export default async (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalConnectionName'
  ).value;
  const oltSerialNumber = document.getElementById(
    'addLocalConnectionOltSwitchNo'
  ).value;

  const portNo = document.getElementById('addLocalConnectionPortNo').value;

  const connectionType = document.querySelector(
    'input[name="addLocalConnectionType"]:checked'
  ).value;

  const color = document.getElementById('addLocalConnectionCoreOption').value;

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
