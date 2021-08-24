const request = require("request");

const forecast = (X, Y, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=09a28ba50548e706da8c1fc1567c0dcb&query=${
    (X, Y)
  }&units=m`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(
        undefined,
        "Today  " +
          body.current.weather_descriptions[0] +
          " And Its currently : " +
          body.current.temperature +
          " degress out. It feels like " +
          body.current.feelslike +
          " degress out. " +
          "Humidity " +
          body.current.humidity +
          " And the wind speed is " +
          body.current.wind_speed
      );
    }
  });
};

module.exports = forecast;
