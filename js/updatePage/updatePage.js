const getPolylineKey = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const targetPolyline = urlParams.get('polylineKey');
  return targetPolyline;
};

getPolylineKey();
