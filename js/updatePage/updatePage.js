let map = null;

const getPolylineKey = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const targetPolyline = urlParams.get('polylineKey');
  return targetPolyline;
};

function importGoogleMapApi() {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzBmP_s-e1BUzOyvk9YnoZtIX40PwWfoM&callback=initMap';
  script.async = true;
  document.head.appendChild(script);
}
importGoogleMapApi();

window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.919524586722066, lng: 90.25663246242456 },
    zoom: 15,
  });
};

getPolylineKey();
