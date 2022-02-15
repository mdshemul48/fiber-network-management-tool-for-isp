export default (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalConnectionName'
  ).value;
  const oldSwitchNumber = document.getElementById(
    'addLocalConnectionOltSwitchNo'
  ).value;

  const portNo = document.getElementById('addLocalConnectionPortNo').value;
  const connectionType = document.querySelector(
    'input[name="addLocalConnectionType"]:checked'
  ).value;

  const newConnection = {
    connectionName,
    oldSwitchNumber,
    portNo,
    connectionType,
    coordinates,
    totalConnection: connectionType === 'epon' ? 64 : 128,
    childrenConnection: {},
    totalConnectionUsed: 0,
  };
  console.log(newConnection);
};
