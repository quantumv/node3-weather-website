const path = require('path')
const express = require('express')
const hbs = require('hbs')
// Step #1
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// new line for Heroku
const port = process.env.PORT || 3000

// Define paths foe Express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (rep, res) => {
    res.render('index', {
        title: 'Weather Globe.com',
        name: 'Weather Home',
        author: 'Quantum Vik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather Globe.com',
        name: 'Quantum Vik',
        author: 'Quantum Vik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'Help me find good weather',
        title: 'Weather Globe.com',
        name: 'Help Me!',
        author: 'Quantum Vik'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            err: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req,res)=> {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide a search term'
        })
    } else {
        geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
            if (err) {
                return res.send({ err })
            }
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) {
                    return res.send({ err })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
           })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Weather Globe.com',
        text: 'Help article found',
    })        
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Weather Globe.com',
        text: 'Page not found',
        author: 'Quantum Vik'
    })
})

// to support Heroku we have to change a reference and add a new line
app.listen(port, () => {
    console.log('Sever is up on port ' + port)
})