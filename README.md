# Weather App

## Overview

This Weather App is a web-based application designed to provide users with current weather conditions for cities and countries around the globe. Developed using React, the app boasts a responsive design that adjusts to various screen sizes for optimal user experience. Users can search for cities by name to retrieve weather information, including conditions (e.g., cloudy, sunny), current temperature, humidity, wind speed, and an accompanying weather icon that visually represents the conditions.

View Live Application: [https://master2.d35m01a902r94k.amplifyapp.com/](https://master2.d35m01a902r94k.amplifyapp.com/)


## Features

- **City Search**: Enables users to search for weather information by entering a city name.
- **Weather Details**: Displays the weather condition, temperature, humidity, wind speed, and a relevant weather icon.
- **Responsive Design**: Provides a seamless experience across different devices.
- **Error Handling**: Utilizes modern React practices for appropriately displaying error messages.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: AWS Lambda, Amazon API Gateway, Node.js, CORS configuration
- **API**: OpenWeatherMap API
- **Deployment**: AWS Amplify

## Security

The OpenWeatherMap API key is secured through a backend infrastructure using AWS services, preventing the API key from being exposed in the frontend code. This addresses API key security and management issues effectively.

## Deployment

Deployment is managed via AWS Amplify, which automatically updates the application with new code pushes to the GitHub repository. This CI/CD integration ensures the application remains up-to-date with the latest changes.

## Backend Configuration

The backend setup streamlines the data retrieval process, enabling a single network request to effectively fetch data from multiple sources. Key components include:

- **CORS Settings for API Gateway**: Configured to allow safe access from different origins, essential for web applications interacting with the API from client-side domains.

- **Lambda Function in Node.js**: A serverless function on AWS Lambda designed to interact with the OpenWeatherMap API, acting as a middleware for fetching and processing weather data.

- **Integration with OpenWeatherMap API**: Explains how the Lambda function retrieves data, including authentication mechanisms (e.g., API keys) and request formatting.

### AWS Mobile Config

AWS Amplify configuration is managed through an environment-specific configuration file, ensuring secure storage and access to API keys and other sensitive information.

## Lambda Function for Weather Data Fetching

The Lambda function fetches weather data from the OpenWeatherMap API, handles CORS by allowing requests from specified origins, and securely retrieves weather information based on the city name provided in the request.

## Conclusion

The Weather App demonstrates the practical application of modern web development technologies and cloud infrastructure to deliver real-time weather information in a user-friendly format. Leveraging React for the frontend and AWS services for the backend and deployment, the app achieves scalability, security, and ease of maintenance.


## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/okanozman-create/contact-form-reactjs.git
Install dependencies:
npm install
Run the application:
npm start

## Usage
Enter a city name in the search box and submit to view the current weather.
Weather details include temperature, humidity, wind speed, and a visual representation of the current weather condition.

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check the issues page for open problems or discussions.

## License
Distributed under the MIT License. See LICENSE for more information.

