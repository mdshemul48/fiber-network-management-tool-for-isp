export default async (polylineKey, polylineType, coordinates) => {
  const connectionName = document.getElementById('addLocalSplitterName').value;
  const localSplitterPortNo = Number(
    document.getElementById('addLocalSplitterPortNo').value
  );
  const localSplitterType = Number(
    document.getElementById('addLocalSplitterType').value
  );

  const connectedCoreColor = document.getElementById(
    'addLocalSplitterConnection'
  ).value;

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
