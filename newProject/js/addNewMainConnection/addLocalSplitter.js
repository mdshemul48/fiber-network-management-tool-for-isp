export default (polylineKey, coordinates) => {
  const connectionName = document.getElementById('addLocalSplitterName').value;
  const localSplitterPortNo = document.getElementById(
    'addLocalSplitterPortNo'
  ).value;
  const localSplitterType = document.getElementById(
    'addLocalSplitterType'
  ).value;
  const connectedWith = document.querySelector(
    'input[name="addLocalSplitterConnectedWith"]:checked'
  ).value;

  console.log(
    connectionName,
    localSplitterPortNo,
    localSplitterType,
    connectedWith
  );
};
