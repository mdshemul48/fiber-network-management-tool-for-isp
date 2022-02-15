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

  console.log(connectionName, oldSwitchNumber, portNo, connectionType);
};
