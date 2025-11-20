export async function fetchWeather() {
  const el = document.getElementById("weather-forecast");
  el.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=14.6773&longitude=120.9842&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FSingapore"
    );
    const data = await res.json();

    el.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const day = data.daily.time[i];
      const min = data.daily.temperature_2m_min[i];
      const max = data.daily.temperature_2m_max[i];

      const card = document.createElement("div");
      card.className = "bg-gray-100 p-3 rounded text-center";

      card.innerHTML = `
        <p class="font-semibold">${day}</p>
        <p>${max}° / ${min}°</p>
      `;
      el.appendChild(card);
    }

  } catch {
    el.innerHTML = "<p class='text-red-600'>Weather unavailable</p>";
  }
}
