# Weather App

## Overview

This Weather App is a web-based application designed to provide users with current weather conditions for cities around the globe. Developed using React, the app boasts a responsive design that adjusts to various screen sizes for optimal user experience. Users can search for cities by name to retrieve weather information, including conditions (e.g., cloudy, sunny), current temperature, humidity, wind speed, and an accompanying weather icon that visually represents the conditions.

View Live Application: [https://master2.d35m01a902r94k.amplifyapp.com/](https://master2.d35m01a902r94k.amplifyapp.com/)

## Features

- **City Search**: Users can search for weather information by entering a city name.
- **Weather Details**: Displays the weather condition, temperature, humidity, wind speed, and a relevant weather icon.
- **Responsive Design**: Ensures a seamless experience across different devices.
- **Error Handling**: Modern React practices are used for displaying error messages appropriately.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: AWS Lambda, Amazon API Gateway, Amazon AppSync (GraphQL), Node.js, CORS configuration
- **API**: OpenWeatherMap API
- **Deployment**: AWS Amplify

## Security

To secure the OpenWeatherMap API key, a backend infrastructure was established using AWS services. This approach prevents the API key from being exposed in the frontend code and addresses issues related to API key security and management.

## Deployment

The application is deployed on AWS Amplify, which automatically updates the app upon new code pushes to the GitHub repository. This CI/CD integration ensures that the application is always up to date with the latest changes.

## Backend Configuration

A fully managed GraphQL API is created with AWS AppSync to allow the frontend to fetch data using GraphQL. This setup simplifies data fetching by enabling a single network request to access data from various sources. The backend configuration includes CORS settings for the API Gateway and a Lambda function developed in Node.js to interact with the OpenWeatherMap API.

### AWS Mobile Config

The AWS Amplify configuration is managed through an environment-specific configuration file, ensuring that API keys and other sensitive information are securely stored and accessed:

 ## Lambda Function for Weather Data Fetching
The Lambda function is responsible for fetching weather data from the OpenWeatherMap API. It handles CORS by allowing requests from specific origins and securely retrieves the weather information based on the city name provided in the request.

##  Conclusion
This Weather App represents a practical application of modern web development technologies and cloud infrastructure to deliver real-time weather information in a user-friendly format. By leveraging React for the frontend and AWS services for the backend and deployment, the app ensures scalability, security, and ease of maintenance.

##  Installation and Setup
Clone the repository
bash
git clone https://github.com/okanozman-create/weather-app-reactjs.git
Install dependencies
npm install
Run the application
npm start

## Usage
Enter a city name in the search box and submit to view the current weather.
Weather details include temperature, humidity, wind speed, and a visual representation of the current weather condition.

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check the issues page for open problems or discussions.

## License
Distributed under the MIT License. See LICENSE for more information.

