import uuidv4 from '../utility/uuid.js';

import Graph from '../storage/Graph.js';
import coreColor from '../utility/coreColor.js';
// this will get only the form data
const formData = () => {
  const connectionName = document.getElementById('mainConnectionName').value;
  const connectionTotalCore = Number(
    document.getElementById('mainConnectionCoreOptions').value
  );
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
    connectionName,
    connectionType: 'PTP',
    totalCore: connectionTotalCore,
    totalCoreUsed: 0,
    coordinates,
    childrenConnection: connectionCoreColor,
  };

  const response = await fetch('/api/create-ptp-connection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mainConnection),
  });
  const data = await response.text();
  console.log(data);

  // const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);

  // const uuid = uuidv4();

  // graph.addVertex(uuid, mainConnection);
  // localStorage.setItem('siteData', JSON.stringify(graph));
  // location.reload();
};
