fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=34.05&lon=-118.24&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    var temp = data.list[0].main.temp;
    var tempCelsius = ((temp - 273.15)*1.8+32).toFixed(2);
    console.log(`Current temperature in Los Angeles: ${tempCelsius} °F`);
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.08&lon=-103.23&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Rapid City');
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=30.27&lon=-97.74&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Austin');
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=41.88&lon=-87.63&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Chicago');
  });

  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=40.71&lon=-74.01&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('New York');
  });

  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=28.54&lon=-81.38&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Orlando');
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=47.61&lon=-122.33&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Seattle');
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=39.74&lon=-104.994&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Denver');
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=33.75&lon=-84.39&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Atlanta');
  });