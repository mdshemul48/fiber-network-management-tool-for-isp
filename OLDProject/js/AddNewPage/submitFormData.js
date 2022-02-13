const submitForm = () => {
  const totalCore = Number(document.getElementById('totalCoreForm').value);
  const connectionType = document.querySelector(
    'input[name="connectionType"]:checked'
  ).value;
  return { totalCore, connectionType };
};

export default submitForm;
