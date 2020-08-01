// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
// Connects server-side code and client-side code

app.use(express.static('website'));


// Setup Server

const port = process.env.PORT || 8080;

const server = app.listen(port, function () {
    console.log(`Server is running on port: ${port}`)
});

// GET route

app.get('/all', (req, res) => {
    res.send(projectData);
})

app.get('*', (req, res) => {
    res.send("This page doesn't exist");
})

// POST route

app.post('/addData', addData);
function addData(request, response) {
    const newWeatherJournal = {
        temperature: request.body.temperature,
        date: request.body.date,
        location: request.body.location,
        feelings: request.body.feelings
    };
    projectData.push(newWeatherJournal);
    response.send(projectData);
}