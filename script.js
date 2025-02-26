let previousPosition = null;

// Função para atualizar o relógio
function updateClock() {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    // Adicionando o dia da semana e a data
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dayOfWeek = daysOfWeek[time.getDay()]; // Pega o dia da semana
    const date = time.getDate().toString().padStart(2, '0'); // Dia do mês
    const month = (time.getMonth() + 1).toString().padStart(2, '0'); // Mês
    const year = time.getFullYear(); // Ano

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} | ${dayOfWeek}, ${date}/${month}/${year}`;
}

// Função para atualizar a temperatura e o clima
const apiKey = "b7c20a70b3eef18f479eb62d2beb14f2"; // Chave de API do OpenWeatherMap
const weatherContainer = document.getElementById('weather');
const temperatureContainer = document.getElementById('temperature');

function updateWeather() {
    // Exibe "Carregando..." enquanto espera a resposta da API
    temperatureContainer.textContent = "Carregando...";

    // URL para a API do OpenWeatherMap para Vitória de Santo Antão
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
                const temperature = data.main.temp; // Temperatura em °C
                const weather = data.weather[0].main; // Condição do tempo (ex: Clear, Rain)

                // Exibe a temperatura
                temperatureContainer.textContent = `${temperature}°C`;

                // Altera o emoji de acordo com a temperatura e a condição
                if (weather === "Rain") {
                    weatherContainer.textContent = "🌧️"; // Chovendo
                } else if (temperature > 30) {
                    weatherContainer.textContent = "☀️"; // Mais de 30°C
                } else {
                    weatherContainer.textContent = "☁️"; // Menos de 30°C ou nublado
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

// Chama as funções logo no início
updateWeather();setInterval(updateWeather, 10000); // Atualiza o clima a cada 10 segundos
setInterval(updateClock, 1000); // Atualiza o relógio a cada 1 segundo
updateClock();
