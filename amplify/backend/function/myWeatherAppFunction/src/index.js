// Import the HTTPS module
const https = require('https');

exports.handler = async (event) => {
    // Get the city from the event's query parameters
    const city = event.queryStringParameters.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000", // Enable CORS
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: data
                });
            });
        }).on('error', (e) => {
            reject({
                statusCode: 500,
                body: 'Error: ' + e.message
            });
        });
    });
};
