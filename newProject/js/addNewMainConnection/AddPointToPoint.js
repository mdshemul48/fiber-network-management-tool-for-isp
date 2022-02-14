export default (polylineKey, polylineCoordinates) => {
  const companyName = document.getElementById(
    'addPointToPointCompanyName'
  ).value;
  const portNo = document.getElementById('addPointToPointPortNo').value;
  const coreColorOptions = document.getElementById(
    'addPointToPointCoreOptions'
  ).value;

  console.log(
    companyName,
    portNo,
    coreColorOptions,
    polylineKey,
    polylineCoordinates
  );
};
