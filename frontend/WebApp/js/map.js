export function initMap() {
    const map = L.map('map-container').setView([14.6773, 120.9842], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const evacuationSites = [
        { name: 'Marulas Elementary School', lat: 14.6780, lng: 120.9850, address: 'Marulas, Valenzuela City' },
        { name: 'Marulas High School', lat: 14.6765, lng: 120.9835, address: 'Marulas, Valenzuela City' },
        { name: 'Valenzuela City Astrodome', lat: 14.6640, lng: 120.9880, address: 'MacArthur Highway, Valenzuela City' },
        { name: 'Valenzuela City People\'s Park', lat: 14.6590, lng: 120.9890, address: 'Gen. T. de Leon, Valenzuela City' },
        { name: 'Coloong Elementary School', lat: 14.6950, lng: 120.9720, address: 'Coloong, Valenzuela City' }
    ];

    const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    evacuationSites.forEach(site => {
        L.marker([site.lat, site.lng], { icon: customIcon }).addTo(map)
            .bindPopup(`<b>${site.name}</b><br>${site.address}`);
    });

    return map;
}