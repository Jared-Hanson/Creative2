document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=7e36e041c6b99b9348e7723180a46b84";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>" + "Feels like: " +  json.main.feels_like + " &deg;F</h2>" + "</p>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	        if (i !== json.weather.length - 1)
	           results += ", "
      }

      results += " with a wind speed of " + json.wind.speed + " Mph" + "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=7e36e041c6b99b9348e7723180a46b84";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = "";
      var curDate = "";
      var time1 = "6:00 am"
      var time2 = "12:00 pm"
      var time3 = "6:00 pm"
      forecast += "<h5> 5 Day Rolling Forcast - 6am, 12 pm and 6pm </h1>"
      for (let i=0; i < json.list.length; i++) {
        if (moment(json.list[i].dt_txt).format('MMMM Do YYYY') != curDate){
          forecast += "<hr>"
          forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h2>";
          var curDate = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
        }
        console.log(moment(json.list[i].dt_txt).format('h:00 a'));
        if(moment(json.list[i].dt_txt).format('h:00 a') == time1 || moment(json.list[i].dt_txt).format('h:00 a') == time2 || moment(json.list[i].dt_txt).format('h:00 a') == time3){
        forecast +="<h4>" + moment(json.list[i].dt_txt).format(' h:00 a') + "<h4>";
	       forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
	       forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
       }
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
