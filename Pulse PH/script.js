function fetchNews() {
    window.open('https://www.philstar.com/', '_blank');
}

async function fetchWeather() {
    try {
        const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=14.6255&longitude=121.124481&current_weather=true');
        if (!weatherResponse.ok) {
            console.error('Error fetching weather data:', weatherResponse.statusText);
            return;
        }
        const weatherData = await weatherResponse.json();
        console.log(weatherData);

        const temperature = weatherData.current_weather.temperature;
        const windSpeed = weatherData.current_weather.windspeed;

        const weatherElement = document.getElementById('weather-info');
        weatherElement.innerHTML = `Temperature: ${temperature}°C <br> Wind Speed: ${windSpeed} km/h`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchCurrencyRates(baseCurrency, targetCurrency) {
    try {
        const currencyResponse = await fetch(`https://v6.exchangerate-api.com/v6/37db5fc1975db34872ad65fd/latest/${baseCurrency}`);
        if (!currencyResponse.ok) {
            console.error('Error fetching currency exchange rates:', currencyResponse.statusText);
            return;
        }
        const currencyData = await currencyResponse.json();
        const exchangeRate = currencyData.conversion_rates[targetCurrency];

        const resultElement = document.getElementById('currency-result');
        resultElement.innerText = `1 ${baseCurrency} = ${exchangeRate} ${targetCurrency}`;
    } catch (error) {
        console.error('Error fetching currency exchange rates:', error);
    }
}

async function fetchStockData() {
    const url = `https://phisix-api3.appspot.com/stocks/BDO.json`;

    try {
        const stockResponse = await fetch(url);
        if (!stockResponse.ok) {
            console.error('Error fetching stock data:', stockResponse.statusText);
            return;
        }
        const stockData = await stockResponse.json();
        const latestData = stockData.stock[0];

        document.getElementById('stock-data').innerHTML = `
            <p><strong>Stock Name:</strong> ${latestData.name}</p>
            <p><strong>Price:</strong> ${latestData.price.amount} PHP</p>
            <p><strong>Percent Change:</strong> ${latestData.percent_change}%</p>
            <p><strong>Volume:</strong> ${latestData.volume}</p>
        `;
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

async function fetchTriviaData() {
    const url = 'https://uselessfacts.jsph.pl/random.json?language=en';

    try {
        const triviaResponse = await fetch(url);
        if (!triviaResponse.ok) {
            console.error('Error fetching trivia data:', triviaResponse.statusText);
            return;
        }
        const triviaData = await triviaResponse.json();
        const triviaFact = triviaData.text;

        document.getElementById('trivia-data').innerHTML = `<p>${triviaFact}</p>`;
    } catch (error) {
        console.error('Error fetching trivia data:', error);
    }
}



document.getElementById('news-button').addEventListener('click', fetchNews);
document.getElementById('dollar-to-peso').addEventListener('click', () => fetchCurrencyRates('USD', 'PHP'));
document.getElementById('euro-to-peso').addEventListener('click', () => fetchCurrencyRates('EUR', 'PHP'));
document.getElementById('yen-to-peso').addEventListener('click', () => fetchCurrencyRates('JPY', 'PHP'));
document.getElementById('saudi-to-peso').addEventListener('click', () => fetchCurrencyRates('SAR', 'PHP'));
document.getElementById('dirham-to-peso').addEventListener('click', () => fetchCurrencyRates('AED', 'PHP'));

fetchWeather();
fetchStockData();
fetchTriviaData();
