document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "b7c20a70b3eef18f479eb62d2beb14f2"; // Chave da API
    const weatherContainer = document.getElementById('weather');
    const temperatureContainer = document.getElementById('temperature');

    function updateWeather() {
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
                    const weather = data.weather[0].main; // Condição do tempo

                    temperatureContainer.textContent = `${temperature}°C`;

                    // Altera o emoji conforme o clima
                    if (weather === "Rain") {
                        weatherContainer.textContent = "🌧️";
                    } else if (temperature > 30) {
                        weatherContainer.textContent = "☀️";
                    } else {
                        weatherContainer.textContent = "☁️";
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateWeather();
    setInterval(updateWeather, 10000); // Atualiza a cada 10 segundos
});
