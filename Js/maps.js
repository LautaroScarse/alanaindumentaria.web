class UserLocation {

  static get(callback) {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((location) => {

        callback({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });

      });

    } else {
      alert("Necesitas activar la ubicación");
    }

  }

}


// 📏 Función para calcular distancia en km
function calcularDistancia(lat1, lon1, lat2, lon2) {

  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}



document.addEventListener("DOMContentLoaded", function () {

  const my_place = {
    lat: -34.940517536528084,
    lng: -58.03743728108097
  };

  const map = L.map('map').setView([my_place.lat, my_place.lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([my_place.lat, my_place.lng])
    .addTo(map)
    .bindPopup("Alana Indumentaria")
    .openPopup();


  UserLocation.get((coords) => {

    // 📍 Marcador del usuario
    /*L.marker([coords.lat, coords.lng])
      .addTo(map)
      .bindPopup("Estás acá");*/

    // 📏 Calcular distancia
    const distancia = calcularDistancia(
      coords.lat,
      coords.lng,
      my_place.lat,
      my_place.lng
    );
    document.querySelector("#message")
        .i

    console.log("Distancia en línea recta:", distancia.toFixed(2), "km");

  });

});