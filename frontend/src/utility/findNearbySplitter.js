const findNearbySplitter = async (from, to, callback) => {
  const request = {
    origin: from,
    destination: to,
    travelMode: "WALKING",
  };

  const directionsService = new window.google.maps.DirectionsService();

  await directionsService.route(request, (result, status) => {
    if (status === "OK") {
      const path = result.routes[0].overview_path;
      callback([from, ...path, to]);
    }
  });
};

export default findNearbySplitter;
