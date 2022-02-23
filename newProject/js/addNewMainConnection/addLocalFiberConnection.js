import coreColor from '../utility/coreColor.js';

export default (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalFiberConnectionName'
  ).value;

  const connectionTotalCore = Number(
    document.getElementById('addLocalFiberConnectionCoreOptions').value
  );

  const selectedCoreColor = coreColor.slice(0, connectionTotalCore);

  const connectionCoreColor = {};
  selectedCoreColor.forEach((item) => {
    connectionCoreColor[item.colorName] = null;
  });
};
