/**
 * Inicialização e configuração do mapa usando Leaflet com OpenStreetMap
 * 
 * Este arquivo contém toda a lógica relacionada ao mapa, incluindo:
 * - Inicialização do mapa Leaflet
 * - Configuração dos tiles do OpenStreetMap
 * - Definição da localização inicial e zoom
 * - Funções para manipulação do mapa (marcadores, rotas, etc.)
 */

// Coordenadas iniciais (Campinas, SP - Brasil)
const initialLat = -22.9064;
const initialLng = -47.0616;
const initialZoom = 15;

// Inicialização do mapa
let map = L.map('map', {
    zoomControl: false,  // Removemos o controle de zoom padrão
    attributionControl: false  // Removemos a atribuição padrão para um visual mais limpo
}).setView([initialLat, initialLng], initialZoom);

// Adicionando os tiles do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adicionamos a atribuição em um local personalizado para manter o visual limpo
map.attributionControl.setPrefix('');

// Função para adicionar um marcador ao mapa
function addMarker(lat, lng, title = '', icon = null) {
    const markerOptions = icon ? { icon } : {};
    const marker = L.marker([lat, lng], markerOptions).addTo(map);
    
    if (title) {
        marker.bindPopup(title);
    }
    
    return marker;
}

// Função para centralizar o mapa em uma localização
function centerMap(lat, lng, zoom = initialZoom) {
    map.setView([lat, lng], zoom, {
        animate: true,
        duration: 1
    });
}

// Função para buscar localização por nome (geocoding)
// Esta é uma implementação simplificada, você pode integrar com um serviço de geocoding real
function searchLocation(query) {
    // Aqui você pode integrar com um serviço como Nominatim (OpenStreetMap)
    // Por exemplo: https://nominatim.openstreetmap.org/search?format=json&q=QUERY
    console.log(`Buscando localização: ${query}`);
    
    // Simulação de resultado para demonstração
    // Em um caso real, você faria uma chamada AJAX para um serviço de geocoding
    setTimeout(() => {
        // Simula um resultado encontrado
        const mockResult = {
            lat: initialLat + (Math.random() * 0.02 - 0.01),
            lng: initialLng + (Math.random() * 0.02 - 0.01),
            name: query
        };
        
        // Adiciona um marcador e centraliza o mapa
        addMarker(mockResult.lat, mockResult.lng, mockResult.name);
        centerMap(mockResult.lat, mockResult.lng);
        
        console.log(`Localização encontrada: ${mockResult.name} (${mockResult.lat}, ${mockResult.lng})`);
    }, 500);
}

// Função para calcular rota entre dois pontos
// Esta é uma implementação simplificada, você pode integrar com um serviço de rotas real
function calculateRoute(startLat, startLng, endLat, endLng) {
    // Aqui você pode integrar com um serviço como OSRM (Open Source Routing Machine)
    console.log(`Calculando rota de (${startLat}, ${startLng}) para (${endLat}, ${endLng})`);
    
    // Simulação de resultado para demonstração
    // Em um caso real, você faria uma chamada AJAX para um serviço de rotas
    const mockRoute = [
        [startLat, startLng],
        [startLat + 0.005, startLng + 0.005],
        [startLat + 0.008, startLng + 0.003],
        [endLat, endLng]
    ];
    
    // Desenha a rota no mapa
    const polyline = L.polyline(mockRoute, {
        color: '#3388ff',
        weight: 6,
        opacity: 0.8
    }).addTo(map);
    
    // Ajusta o zoom para mostrar toda a rota
    map.fitBounds(polyline.getBounds(), {
        padding: [50, 50]
    });
}

// Eventos de interação com o mapa
map.on('click', function(e) {
    console.log(`Clique no mapa em: ${e.latlng.lat}, ${e.latlng.lng}`);
});

// Inicialização de eventos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Configuração dos campos de busca
    const startInput = document.querySelector('.search-input:first-of-type');
    const endInput = document.querySelector('.search-input:last-of-type');
    
    if (startInput && endInput) {
        startInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                searchLocation(this.value.trim());
            }
        });
        
        endInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                searchLocation(this.value.trim());
            }
        });
    }
});
