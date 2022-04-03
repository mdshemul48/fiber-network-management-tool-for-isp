import { showError } from '../utility/showMessageAndError.js';

export default async (polylineKey, polylineType, coordinates) => {
  const connectionName = $('#addLocalSplitterName').val();
  const localSplitterPortNo = Number($('#addLocalSplitterPortNo').val());
  const localSplitterType = Number($('#addLocalSplitterType').val());
  const connectedCoreColor = $('#addLocalSplitterConnection').val();

  const newSplitterConnection = {
    parentType: polylineType,
    parent: polylineKey,
    name: connectionName,
    coordinates,
    splitterLimit: localSplitterType,
    color: connectedCoreColor,
    portNo: localSplitterPortNo,
  };

  const response = await fetch('/api/splitter-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(newSplitterConnection),
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
