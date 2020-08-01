/* Global Variables */


const baseURL = "https://api.openweathermap.org/data/2.5/weather?q="
const apiKey = "&appid=8ad001ab4414cb6a4e7374556d0e4d32&units=metric"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);



const getWeather = async (baseURL, zipCode, country, apiKey) => {
    const req = await fetch(baseURL + zipCode + ',' + country + apiKey)
    try {
        const getData = await req.json();
        console.log(getData);
        return getData;
    } catch (error) {
        console.log("error", error);
    }
}

const postWeather = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    try {
        const postData = await res.json();
        return postData;
    } catch (error) {
        console.log('error', error);
    }
};

const updateData = async () => {
    const req = await fetch('/all');
    try {
        const weatherData = await req.json();
        const lastRecord = weatherData.length - 1;

        const location = weatherData[lastRecord].location;
        const weather_temp = Math.round(weatherData[lastRecord].temperature);
        const feelings = document.getElementById('feelings').value;

        document.getElementById('city').innerHTML = `City: ${location}`;
        document.getElementById('temp').innerHTML = `Temperature: ${weather_temp}&deg;C`;
        document.getElementById('date').innerHTML = `Date: ${newDate}`;
        document.getElementById('content').innerHTML = `Feelings: ${feelings}`;
    } catch (error) {
        console.log('error', error);
    }
};

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, country, apiKey)
        .then(function (getData) {
            postWeather('/addData', {
                location: getData.name,
                temperature: getData.main.temp,
                date: newDate,
                feelings: feelings
            });
        })
        .then(updateData)
    console.log("clicked");
}