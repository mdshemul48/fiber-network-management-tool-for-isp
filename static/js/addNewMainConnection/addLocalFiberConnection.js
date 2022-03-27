import coreColor from '../utility/coreColor.js';

export default async (polylineKey, selectedPolylineType, coordinates) => {
  const name = document.getElementById('addLocalFiberConnectionName').value;

  const connectionTotalCore = Number(
    document.getElementById('addLocalFiberConnectionCoreOptions').value
  );

  const selectedCoreColor = coreColor.slice(0, connectionTotalCore);

  const connectionCoreColor = {};
  selectedCoreColor.forEach((item) => {
    connectionCoreColor[item.colorName] = null;
  });

  const localFiberConnection = {
    name,
    parent: polylineKey,
    parentType: selectedPolylineType,
    totalCore: connectionTotalCore,
    coordinates,
  };

  const response = await fetch('/api/local-fiber-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(localFiberConnection),
  });
  const { status, data } = await response.json();

  if (status === 'success') {
    location.reload();
  } else {
    console.log(status, data);
  }
};
