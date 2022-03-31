const showMessage = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      color: 'white',
      'font-weight': '500',
      background: 'black',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

const showError = (errorMessage) => {
  Toastify({
    text: errorMessage,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      color: 'red',
      'font-weight': '500',
      background: 'white',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

export { showError };

export default showMessage;
