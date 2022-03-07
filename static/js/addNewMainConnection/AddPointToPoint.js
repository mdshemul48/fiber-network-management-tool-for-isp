import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default async (polylineKey, coordinates) => {
  const companyName = document.getElementById(
    'addPointToPointCompanyName'
  ).value;
  const portNo = document.getElementById('addPointToPointPortNo').value;
  const coreColor = document.getElementById('addPointToPointCoreOptions').value;

  const pointToPointPolyline = {
    parentKey: polylineKey,
    companyName,
    connectionType: 'PointToPoint',
    portNo,
    coreColor,
    coordinates,
  };

  console.log(JSON.stringify(pointToPointPolyline));

  // const response = await fetch('/api/create-ptp-connection', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(pointToPointPolyline),
  // });
  // const data = await response.json();
  // console.log(data);
};
