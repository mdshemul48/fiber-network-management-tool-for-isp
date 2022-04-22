// get point on polyline
const getPointOnPolyline = (coordinates, targetPoint) => {
  const point = turf.point(targetPoint);
  const line = turf.lineString(coordinates);
  const snapped = turf.pointOnLine(line, point);

  const pstnOnLine = {
    lat: snapped.geometry.coordinates[1],
    lng: snapped.geometry.coordinates[0],
  };
  return pstnOnLine;
};

export default async (coordinates, point, callback) => {
  let finalResult = null;

  const pointOnLine = getPointOnPolyline(coordinates, [
    point.lng(),
    point.lat(),
  ]);

  const directionsService = new google.maps.DirectionsService();

  const request = {
    origin: new google.maps.LatLng(pointOnLine.lat, pointOnLine.lng),
    destination: point,
    travelMode: 'WALKING',
  };

  await directionsService.route(request, async function (result, status) {
    if (status === 'OK') {
      const allSteps = result.routes[0].legs[0].steps;
      let shortestDistance = +Infinity;
      let shortestPath = null;
      for (let i = 0, j = 0; i < allSteps.length && j < 2; i++, j++) {
        const step = allSteps[i];

        const { lat, lng } = getPointOnPolyline(coordinates, [
          step.start_location.lng(),
          step.start_location.lat(),
        ]);

        const request = {
          origin: new google.maps.LatLng(lat, lng),
          destination: point,
          travelMode: 'WALKING',
        };
        await directionsService.route(request, async (result, status) => {
          if (status === 'OK') {
            const {
              distance: { value },
            } = result.routes[0].legs[0];

            if (value < shortestDistance) {
              shortestDistance = value;
              shortestPath = result;
            }
          }
        });
      }

      const {
        routes: [{ overview_path: path }],
      } = shortestPath;

      const { lat, lng } = getPointOnPolyline(coordinates, [
        path[0].lng(),
        path[0].lat(),
      ]);
      const startPoint = new google.maps.LatLng(lat, lng);
      const endPoint = point;

      finalResult = [startPoint, ...path, endPoint];
      callback(finalResult);
    }
  });
};
