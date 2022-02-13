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
export default (coordinates) => {
  const { connectionName, connectionTotalCore } = formData();
  const selectedCoreColor = coreColor.slice(0, connectionTotalCore);

  const connectionCoreColor = {};
  selectedCoreColor.forEach((item) => {
    connectionCoreColor[item.colorName] = null;
  });

  console.log(
    coordinates,
    connectionName,
    connectionTotalCore,
    connectionCoreColor
  );
};
