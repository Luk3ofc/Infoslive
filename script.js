let previousPosition = null;
let totalDistance = 0;

// Função para calcular a distância entre dois pontos (usando fórmula Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em km
    return distance;
}

// Função para atualizar o relógio e a data
function updateClock() {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    const day = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const year = time.getFullYear();

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = `${day}/${month}/${year}`;
}

// Função para atualizar a temperatura e o clima
const apiKey = "b7c20a70b3eef18f479eb62d2beb14f2"; // Chave de API do OpenWeatherMap
const weatherContainer = document.getElementById('weather');
const temperatureContainer = document.getElementById('temperature');

function updateWeather() {
    temperatureContainer.textContent = "Carregando...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Vitória de Santo Antão&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha na requisição da API");
            }
            return response.json();
        })
        .then(data => {
            if (data.main && data.weather) {
                const temperature = data.main.temp; 
                const weather = data.weather[0].main;

                temperatureContainer.textContent = `${temperature}°C`;

                if (weather === "Rain") {
                    weatherContainer.textContent = "🌧️"; 
                } else if (temperature > 30) {
                    weatherContainer.textContent = "☀️"; 
                } else {
                    weatherContainer.textContent = "☁️"; 
                }
            } else {
                console.log("Erro ao obter dados da API");
                temperatureContainer.textContent = "Erro ao carregar temperatura"; 
            }
        })
        .catch(error => {
            console.log(error);
            temperatureContainer.textContent = "Erro ao obter temperatura"; 
        });
}

// Função para atualizar a quilometragem
function updateKm() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
            const currentPosition = position.coords;

            if (previousPosition) {
                const distance = calculateDistance(previousPosition.latitude, previousPosition.longitude, currentPosition.latitude, currentPosition.longitude);
                totalDistance += distance;
            }

            previousPosition = currentPosition;

            document.getElementById("km").textContent = `😎${totalDistance.toFixed(1)} km`;
        }, function(error) {
            console.error("Erro ao obter a localização", error);
        });
    } else {
        alert("Geolocalização não é suportada neste navegador.");
    }
}

// Chama as funções logo no início
updateWeather();
updateKm();
setInterval(updateWeather, 60000); 
setInterval(updateClock, 1000); 
updateClock();
