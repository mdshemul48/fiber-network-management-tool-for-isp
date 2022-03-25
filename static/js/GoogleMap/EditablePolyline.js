class EditablePolyline {
  polyline = null;
  constructor(polylinePath) {
    this.polyline = new window.google.maps.Polyline({
      path: polylinePath || [],
      editable: true,
      strokeColor: '#313552',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    window.google.maps.event.addListener(
      this.polyline,
      'contextmenu',
      this.removeVertex
    );
  }
  addVertex(LetLng) {
    const path = this.polyline.getPath();
    path.push(LetLng);
  }
  removeVertex(event) {
    if (event.vertex !== undefined) {
      const path = this.getPath();
      path.removeAt(event.vertex);
    }
  }
  getAllThePath() {
    const path = this.polyline.getPath();
    const allCoordinatesFunctions = path.Ed || path.Fd;
    if (allCoordinatesFunctions.length >= 2) {
      const allCoordinates = allCoordinatesFunctions.map(({ lat, lng }) => ({
        lat: lat(),
        lng: lng(),
      }));
      return allCoordinates;
    } else {
      return null;
    }
  }
  setMap(map) {
    this.polyline.setMap(map);
  }
}

export default EditablePolyline;
