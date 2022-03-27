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

  const { status, data } = await response.json();

  if (status === 'success') {
    location.reload();
  } else {
    console.log(status, data);
  }
};
