const submitForm = () => {
  const totalCore = document.getElementById('totalCoreForm').value;
  const connectionType = document.querySelector(
    'input[name="connectionType"]:checked'
  ).value;
  return { totalCore, connectionType };
};

export default submitForm;
