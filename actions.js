if(navigator.geolocation){
  //Geolocation to determine user's position
  navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    //Arrays of backgrounds and weather conditions
    var images = [['url("https://upload.wikimedia.org/wikipedia/en/a/a1/Tarfala_Valley_-_Sweden.jpg")', 'url("http://www.youwall.com/wallpapers/201404/sunny-mountains-wallpaper.jpg")', 'url("http://www.zastavki.com/pictures/originals/2014/Nature___Seasons___Spring_Sunny_spring_meadow_066156_.jpg")', /*'url("http://www.mrwallpaper.com/wallpapers/sunny-beach.jpg")'*/, 'url("https://cdn.thinglink.me/api/image/493102624137019393/1240/10/scaletowidth")'], 'url("https://wallpaperstock.net/cloudy-sea-wallpapers_14039_1920x1200.jpg")', 'url("https://d1w9csuen3k837.cloudfront.net/Pictures/1280x720/8/9/2/129892_shutterstock_433625311-crop.jpg")', 'url("https://www.muralswallpaper.com/app/uploads/amidst-the-mist-forest-plain.jpg")', 'url("https://static.bhphotovideo.com/explora/sites/default/files/Correct.jpg")', 'url("https://23711-presscdn-pagely.netdna-ssl.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg")'];
        
    var weatherConditions = ["Clear", "Clouds", "Rain", "Mist", "Snow", "Thunderstorms"];
       
    //URL used for API call
    var weatherURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
    $("#data").html("latitude: " + latitude + "<br>longitude: " + longitude);
    
    //API call
    $.getJSON(weatherURL, function(data){
         
      //Gets temperature based off chosen scale
      function getTemp(celsius, bool){
        var temp;
        if(bool == true){
          temp = celsius*1.8 + 32;
        }else{
          temp = celsius;
        }
        return temp.toFixed(1);
      }
      
      //Returns chosen scale suffix
      function chooseScale(bool){
        if(bool == true){
          scale = " °F";
        }else{
          scale = " °C"
        }
        return scale;
      }
      
      //Sets the background depending on temperature and weather
      function setBackground(weather){
        var background;
        var tempCelsius = getTemp(data.main.temp, false)
        var i = weatherConditions.indexOf(weather);
        if(i == 0){
          var j;
          if( tempCelsius <= 0){
            j = 0;
          }else if(tempCelsius > 0 && tempCelsius <= 15 ){
            j = 1;
          }else if(tempCelsius > 15 && tempCelsius <= 30){
            j = 2;
          }//else if(tempCelsius > 20 && tempCelsius <= 30){
            //j = 3;
          //}
        else{
            j = 4;
          }
          background = images[i][j];
        }else{
          background = images[i];
        }
        $("#container").css("background-image", background);
      }
      
      //Interactivity that changes the temperature scale
      var bool = true;
       $("#celsius-button").on("click", function(bool){
         bool = false;
         $("#temp > p").html(getTemp(data.main.temp, bool) + chooseScale(bool));
      });
       $("#fahrenheit-button").on("click", function(bool){
         bool = true;
         $("#temp > p").html(getTemp(data.main.temp, bool) + chooseScale(bool));
      });

      //Outputs background and data
      setBackground(data.weather[0].main);
      $("#temp > p").append(getTemp(data.main.temp, bool) + chooseScale(bool));
      $("#weather > p").append(data.weather[0].main);
      $("#location > p").append(data.name + "," + data.sys.country);
 
      });
  });
}