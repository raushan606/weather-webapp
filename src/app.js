const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlbars engine and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Raushan Kumar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About US",
    name: "Raushan"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help Please",
    title: "Help",
    name: "Raushan"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address"
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });

  // res.send({
  //   forecast: "It is snowing",
  //   locations: "Greater Noida",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.query;
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Raushan Kumar",
    errorMessage: "Help Article Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Raushan Kumar",
    errorMessage: "Page Not Found"
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express</h1>");
// });

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log("Server is Up on port no. "+port);
});
