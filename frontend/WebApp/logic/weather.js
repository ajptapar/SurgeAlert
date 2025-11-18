 async function fetchWeather() {
            const weatherContainer = document.getElementById('weather-forecast');
            const url = `https://api.open-meteo.com/v1/forecast?latitude=14.6773&longitude=120.9842&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia/Singapore`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                weatherContainer.innerHTML = '';

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                for (let i = 0; i < 5; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    
                    const dayData = data.daily;
                    const dayIndex = data.daily.time.findIndex(t => new Date(t).toDateString() === date.toDateString());
                    
                    if (dayIndex === -1) continue;

                    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const tempMax = Math.round(dayData.temperature_2m_max[dayIndex]);
                    const tempMin = Math.round(dayData.temperature_2m_min[dayIndex]);
                    const weatherCode = dayData.weathercode[dayIndex];
                    
                    const weatherInfo = getWeatherInfo(weatherCode);

                    const card = document.createElement('div');
                    card.className = 'bg-gray-50 p-3 rounded-lg flex flex-col items-center';
                    card.innerHTML = `
                        <p class="font-semibold">${day}</p>
                        <div class="text-4xl my-2">${weatherInfo.icon}</div>
                        <p class="text-sm">${weatherInfo.description}</p>
                        <p class="text-sm mt-1 font-medium">${tempMax}° / ${tempMin}°</p>
                    `;
                    weatherContainer.appendChild(card);
                }
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
                weatherContainer.innerHTML = '<p class="text-red-500 col-span-full">Could not load weather data.</p>';
            }
        }

		function getWeatherInfo(code) {
            const weatherMap = {
                0: { description: 'Sunny', icon: '☀️' },
                1: { description: 'Sunny', icon: '🌤️' },
                2: { description: 'Partly Cloudy', icon: '⛅' },
                3: { description: 'Cloudy', icon: '☁️' },
                4: { description: 'Hazy', icon: '🌫️' },
                5: { description: 'Hazy', icon: '🌫️' }, 
                10: { description: 'Misty', icon: '🌫️' }, 
                45: { description: 'Foggy', icon: '🌫️' },
                48: { description: 'Foggy', icon: '🌫️' },
                51: { description: 'Light Rain', icon: '🌦️' },
                53: { description: 'Light Rain', icon: '🌦️' },
                55: { description: 'Light Rain', icon: '🌦️' },
                61: { description: 'Rain', icon: '🌧️' },
                63: { description: 'Rain', icon: '🌧️' },
                65: { description: 'Heavy Rain', icon: '🌧️' },
                80: { description: 'Showers', icon: '🌦️' },
                81: { description: 'Showers', icon: '🌦️' },
                82: { description: 'Heavy Showers', icon: '🌦️' },
                95: { description: 'Thunderstorm', icon: '⛈️' },
                96: { description: 'Thunderstorm', icon: '⛈️' }, 
                99: { description: 'Thunderstorm', icon: '⛈️' }, 
            };
            return weatherMap[code] || { description: 'Unknown', icon: '❓' };
        }