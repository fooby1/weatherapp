$(document).ready(function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {


        $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=false" , function(data) {
          $('#theCity').hide().html(data.results[0].address_components[1].long_name + ", " + data.results[0].address_components[2].long_name).fadeIn("slow");
        });

        // Get Weather From API
        $.getJSON("https://api.darksky.net/forecast/32787c73f1b51e1e390f713136119916/" + position.coords.latitude + "," + position.coords.longitude + "?callback=?" , function(data) {

          //var temp = Math.floor((data.currently.temperature - 32) * 5 / 9);

          var icon = data.currently.icon;
          var skycons = new Skycons({ "color": "#ebebeb" });
          skycons.add("icon-canvas", icon);
          skycons.play();

          $("#theTime").hide().html(moment.unix(data.currently.time).format("h:mm a")).fadeIn("slow");

          $("#sky").html()

          $("#sky").html(data.currently.icon)

          $("#condition").html(data.minutely.summary);

          $("#short-forecast").html(data.hourly.summary);

          $("#humid").html(" " + Math.round(data.currently.humidity) + "%");

          $("#chance-rain").html(" " + Math.round(data.minutely.data[0].precipProbability) + "% rain");

          $("#rise").html(" " + moment.unix(data.daily.data[0].sunriseTime).format("HH:mm"));

          $("#set").html(" " + moment.unix(data.daily.data[0].sunsetTime).format("HH:mm"));

          var heat = {
            temperature:50
          };

          var tempC = Math.floor((heat.temperature - 32) * 5 / 9) + "°";

          var tempF = Math.floor(heat.temperature) + "°";

          $("#temp").hide().html(tempC).fadeIn("slow");

          $("#temp").click(function() {
            if($(this).text() === tempF)
              $(this).text(tempC)
            else {
              $(this).text(tempF)
            }
          });

        });

    });

  }

});
