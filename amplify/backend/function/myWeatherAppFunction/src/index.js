// const https = require("https");

// exports.handler = async (event) => {
//   const allowedOrigins = "https://master2.d35m01a902r94k.amplifyapp.com";

//   const city = event.queryStringParameters.city;
//   const apiKey = process.env.OPENWEATHER_API_KEY;
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   return new Promise((resolve, reject) => {
//     https
//       .get(url, (res) => {
//         let data = "";

//         res.on("data", (chunk) => {
//           data += chunk;
//         });
//         res.on("end", () => {
//           const origin = event.headers.origin;
//           const allowedOrigin = allowedOrigins.includes(origin)
//             ? origin
//             : allowedOrigins[0];

//           resolve({
//             statusCode: 200,
//             headers: {
//               "Access-Control-Allow-Origin": allowedOrigin,
//               "Access-Control-Allow-Headers": "*",
//             },
//             body: data,
//           });
//         });
//       })
//       .on("error", (e) => {
//         reject({
//           statusCode: 500,
//           body: "Error: " + e.message,
//         });
//       });
//   });
// };

const https = require("https");

exports.handler = async (event) => {
  const appURL = process.env.AppURL;
  const city = event.queryStringParameters.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // const url = `${appURL}?q=${city}&appid=${apiKey}&units=metric`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          const origin = event.headers.origin;
          const allowedOrigin = appURL.includes(origin) ? origin : appURL;

          resolve({
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": allowedOrigin,
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            },
            body: data,
          });
        });
      })
      .on("error", (e) => {
        reject({
          statusCode: 500,
          body: "Error: " + e.message,
        });
      });
  });
};
