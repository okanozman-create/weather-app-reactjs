// Import the HTTPS module
const https = require('https');

exports.handler = async (event) => {
    
     const allowedOrigins = [
        'http://localhost:3000',
        'https://master2.d35m01a902r94k.amplifyapp.com'
    ];

    
    
    
    // Get the city from the event's query parameters
    const city = event.queryStringParameters.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                
                // Check the incoming origin
                const origin = event.headers.origin;
                const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]; // Default to the first allowed origin if not matching
                
                
                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": allowedOrigin,
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
