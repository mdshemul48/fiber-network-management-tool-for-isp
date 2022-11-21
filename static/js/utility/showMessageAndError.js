const showMessage = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      color: "white",
      "font-weight": "400",
      background: "black",
    },
    onClick() {}, // Callback after click
  }).showToast();
};

const showError = (errorMessage) => {
  Toastify({
    text: errorMessage,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      color: "red",
      "font-weight": "400",
      background: "white",
    },
    onClick() {}, // Callback after click
  }).showToast();
};

export { showError };

export default showMessage;
