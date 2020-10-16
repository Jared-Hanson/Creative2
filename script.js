document.getElementById("pokemon").addEventListener("click", function(event) {
  console.log("hello");
  event.preventDefault();
  const value = document.getElementById("pokemonText").value;
  if (value === "")
    return;
  console.log(value);

  const url = "https://pokeapi.co/api/v2/pokemon/" + value;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h2> Name: ' + json.name + "</h2>"
      results += '<h3> Weight: ' + json.weight + "</h3>"

      results += "<img src= \"http://pokeres.bastionbot.org/images/pokemon/" + json.id + ".png\">"

      document.getElementById("weatherResults").innerHTML = results;
    });


});
