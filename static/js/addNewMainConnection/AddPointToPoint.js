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

  const response = await fetch('/api/create-corporate-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pointToPointPolyline),
  });
  const data = await response.json();

  location.reload();
};
