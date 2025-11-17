export function initMap() {
  const map = L.map("map").setView([14.6769, 120.9844], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const sites = [
    { name: "Marulas Elementary School", lat: 14.678, lng: 120.985 },
    { name: "Valenzuela Astrodome", lat: 14.664, lng: 120.988 }
  ];

  sites.forEach(s => {
    L.marker([s.lat, s.lng]).addTo(map).bindPopup(`<b>${s.name}</b>`);
  });
}
