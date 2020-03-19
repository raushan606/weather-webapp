const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/4c50d98e3f7ddc7ed79d0ec8068257ca/" +
    latitude +
    "," +
    longitude;

  request(
    {
      url,
      json: true
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect to Weather Service", undefined);
      } else if (body.error) {
        callback("Unable to find loaction", undefined);
      } else {
        callback(undefined, body.daily.data[0].summary+' '+body.currently.temperature+' degree.');
      }
    }
  );
};

module.exports = forecast;
