const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// **Define paths  for Express config** //
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// ** setup handlebars engine and views location**//
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// ** setup a static directory to serve **//
app.use(express.static(publicDirectoryPath));
// app.use(express.static(path.join(__dirname, "../public/help")));

// app.com
// app.com/about
// app.com/home

//reguar msg
app.get("", (req, res) => {
  // res.send("main express!");
  res.render("index", {
    title: "Weather app",
    name: "soukaina zekri",
  });
});

//html
app.get("/about", (req, res) => {
  // res.send("<h1>About page</h1>");
  res.render("about", {
    title: "About me",
    name: "soukaina zekri",
  });
});

//json
app.get("/help", (req, res) => {
  res.render("help", {
    msg: "we can help you if you send us an email ",
    title: "Help!",
    name: "soukaina zekri",
  });
  // res.send([
  //   {
  //     name: "ale",
  //     age: 27,
  //   },
  //   {
  //     name: "jhon",
  //     age: undefined,
  //   },
  // ]);
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: error,
            });
          }
          console.log(req.query);
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
          console.log(location);
          console.log(forecastData);
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  // res.send("help article not found!");
  res.render("error", {
    title: 404,
    name: "soukaina zekri",
    msg: "help article not found!",
  });
});
app.get("*", (req, res) => {
  // res.send("My 404 page");
  res.render("error", {
    title: 404,
    name: "soukaina zekri",
    msg: "My 404 page",
  });
});
app.listen(port, () => {
  console.log("listing to port " + port);
});
