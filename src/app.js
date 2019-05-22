const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
//Change path of handlebars from views folder to templates folder
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Jay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a helpful text',
        name: 'Jay'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Please provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, callback) => {
            if (error){
                return res.send(error)
            }

            res.send({
                message: callback,
                location: location
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('error', {
        message : 'Help article not found.',
        title: 'Error 404',
        name: 'Jay'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message : 'Page not found',
        title: 'Error 404',
        name: 'Jay'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})