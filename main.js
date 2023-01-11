let weather = {
    apiKey: "296f685184883b43d5ff016bac4eca23",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          this.apiKey
      )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));

      },
      displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png"
        document.querySelector(".temp").innerHTML = temp + "°F";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "mi/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ')'
      },
      search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value)
      }
    }

    document.querySelector(".search button").addEventListener("click", function() {
       weather.search();
       document.querySelector(".search-bar").value = ""
    })

    document.querySelector(".search-bar").addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
            document.querySelector(".search-bar").value = ""
        }
     })

     weather.fetchWeather("Tampa")