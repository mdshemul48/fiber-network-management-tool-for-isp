import { showError } from '../utility/showMessageAndError.js';
import coreColor from '../utility/coreColor.js';
import printPointToPoint from '../GoogleMap/printPolylineConnection/printPointToPoint.js';

// this will get only the form data
const formData = () => {
  const connectionName = $('#mainConnectionName').val();
  const connectionTotalCore = Number($('#mainConnectionCoreOptions').val());
  return { connectionName, connectionTotalCore };
};

// this wil do all the process of adding the new main connection
export default async (coordinates) => {
  const { connectionName, connectionTotalCore } = formData();
  const selectedCoreColor = coreColor.slice(0, connectionTotalCore);

  const connectionCoreColor = {};
  selectedCoreColor.forEach((item) => {
    connectionCoreColor[item.colorName] = null;
  });

  const mainConnection = {
    name: connectionName,
    totalCore: connectionTotalCore,
    coordinates,
  };

  const response = await fetch('/api/ptp-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mainConnection),
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
