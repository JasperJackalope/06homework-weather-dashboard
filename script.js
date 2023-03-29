fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b4148f60988f2ad1e2369a15677ad5b8`)
  .then(response => response.json())
  .then(data => {
    // Access the weather data from the JSON response here
    console.log(data);
  })
  .catch(error => {
    // Handle any errors here
    console.error(error);
  });


