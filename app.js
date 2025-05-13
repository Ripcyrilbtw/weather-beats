// Set up variables

const weatherInput = document.getElementById("weatherInput");
const playNextBtn = document.getElementById("playNextBtn");
const stopBtn = document.getElementById("stopBtn");
const weatherTitle = document.getElementById("weatherTitle");
const weatherDesc = document.getElementById("weatherDesc");
const weatherCard = document.getElementById("weatherCard");

// Listen for "Enter" keypress on weather input box
weatherInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getWeatherData();
  }
});

// Listen for "click" event on play next button
playNextBtn.addEventListener("click", function() {
  playMusic();
});

// Listen for "click" event on stop button
stopBtn.addEventListener("click", function() {
  stopMusic();
});

// Default city
const DEFAULT_CITY = 'San Jose';

// Weather API key
const API_KEY = "cfbfd8d33ad14c66b66231757232903";

// Get DOM elements
const weatherIcon = document.getElementById("weatherIcon");
const weatherTemp = document.getElementById("weatherTemp");
const weatherDescEl = document.getElementById("weatherDesc");

// Get weather data from the API
async function getWeatherData() {
  const city = weatherInput.value || DEFAULT_CITY;
    console.log('Updating weatherdata...');
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  );
    console.log(response);
  const data = await response.json();
  console.log(data);
  const { temp_f, condition, condition: { icon } } = data.current;
  return {
    temp_f,
    condition,
    icon,
  };
}

// Update weather data on the page
async function updateWeather() {
  console.log('Updating weather...');
  const { temp_f, condition, icon } = await getWeatherData();
  console.log('Updating weather done...');
  weatherIcon.src = `https:${icon}`;
  console.log(temp_f);
weatherTemp.innerHTML = `${temp_f}&deg;F`;
  const city = weatherInput.value || DEFAULT_CITY;
  console.log(city);
  weatherTitle.innerHTML = `${city}`;
  weatherDescEl.innerHTML = condition.text;
  return { temp_f, condition, icon };
}

// Get the music genre matching the current weather conditions
function getMusicGenre(weatherData) {
  console.log("genre enter");
  console.log(weatherData);
  const condition = weatherData.condition.text.toLowerCase();
  let genre;

  if (condition.includes('clear')) {
    genre = 'arrahman';
  } else if (condition.includes('cloud')) {
    genre = 'ilayaraja';
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    genre = 'ilayaraja';
  } else if (condition.includes('thunderstorm')) {
    genre = 'rajni';
  } else if (condition.includes('snow')) {
    genre = 'anirudh';
  } else {
    genre = 'deva';
  }

console.log("genre");
console.log(genre);
  return genre + 'tamil songs';
}

// Play the next song of the given music genre using the YouTube API
function playNextSong(genre) {
  const apiKey = 'AIzaSyBUQ4wnlHWALqdtWC_gqK1zZxV7fHW2JhU';
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${genre}&type=video&key=${apiKey}`;
  console.log("fetching utube");

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const index = Math.floor(Math.random() * data.items.length);
      console.log(index);
      const videoId = data.items[index].id.videoId;
      const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0`;
console.log(videoUrl);
      console.log("fetched utube");
      document.getElementById('player').src = videoUrl;
    })
    .catch(error => console.error(`Failed to fetch YouTube data: ${error}`));
}


// Stop the currently playing song
function stopMusic() {
  document.getElementById('player').src = '';
}

// Handle button click events
document.addEventListener('DOMContentLoaded', () => {
// Get the default weather data
getWeatherData();
updateWeather(DEFAULT_CITY);

// Listen for "Enter" keypress on weather input box
weatherInput.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
event.preventDefault();
getWeatherData();
updateWeather(weatherInput.value);
}
});

// Handle the "Play Next" button click event
playNextBtn.addEventListener('click', () => {
  updateWeather(weatherInput.value || DEFAULT_CITY)
    .then(data => {
      console.log("updateweather in event done");
      console.log(data); // check the value of data object
      return getMusicGenre(data);
    })
    .then(genre => playNextSong(genre))
    .catch(error => console.error(`Failed to play next song: ${error}`));
});



// Handle the "Stop Music" button click event
stopBtn.addEventListener('click', () => {
  stopMusic();
});
});