const express = require('express')
const app = express() 
const mustacheExpress = require('mustache-express')
// setting up Express to use Mustache Express as template pages 
app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views', './views')
// extension will be .mustache
app.set('view engine','mustache')
let trips = []
app.use(express.urlencoded())

app.get('/add-trip', (req,res) => {
    res.render('add-trip')
})

app.post('/add-trip', (req, res) => {
    let title = req.body.title
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let image = req.body.image
    // console.log(title)
    // console.log(departureDate)
    // console.log(returnDate)
    // console.log(image)
    let trip = {title: title, departureDate: departureDate, returnDate: returnDate, image: image}
    trips.push(trip)
    // res.render('add-trip', {listOfTrips: trips})
    res.redirect('/view-trips')
})

app.get('/view-trips', (req,res) => {
    // let tasks = [{title: "Wash the car", priority: "high"}, {title: "Feed dog", priority: "low"}, {title: "Mow lawn", priority: "medium"}]
    res.render('view-trips', {listOfTrips: trips})
})

app.post('/delete', (req,res) => {
    let deleteTrip = req.body.deleteTrip
    // console.log(trips)
    let newTrips = trips.filter((trip) => {
        return trip.title != deleteTrip
    })
    // console.log(newTrips)
    trips = newTrips
    // console.log(trips)
    res.redirect('/view-trips')
})

app.listen(2000,() => {
    console.log('Server is running...')
})