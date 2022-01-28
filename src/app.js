const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();

//Define paths for express configs
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up static directory
app.use(express.static(publicPath));

//Set up handlebars config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.listen(3000, () => {
    console.log('Server is up');
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anna',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anna',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'how can I help you?',
        title: "Help",
        name: 'Anna'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: "you need to provide address"})
    }
    geocode(req.query.address, (coordinatesError, {longitude, latitude, location} = {}) => {
        if (coordinatesError) {
            return res.send({error:coordinatesError});
        }
        weather(longitude, latitude, (weatherError, weather) => {
            if (weatherError) {
                return res.send({error:weatherError});
            }
            const {temperature, precip, weather_descriptions} = weather;
            return res.send({
                address: req.query.address,
                location,
                forecast: `${weather_descriptions[0]}. It is currently ${temperature} degrees outside. The chance of rain is ${precip}%`
            });

        });
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({error: 'you must provide a search term'})
    } else {
        res.send({products: []})
    }
})

app.get('/help/**', (req, res) => {
    res.render('404', {
        title: "Route not found in the help articles",
        name: 'Anna'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Route not found on the site",
        name: 'Anna'
    })
})