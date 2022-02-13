console.log('hello world');
let map;

const insertScript = () => {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&libraries=geometry&callback=initMap';
  script.async = true;
  document.head.appendChild(script);
};
insertScript();

window.initMap = function () {
  console.log('hello world');
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });
};
