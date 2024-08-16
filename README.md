Weather Monitoring Application

Overview --> 
This Weather Monitoring Application allows users to select a city and view the current weather details, including temperature, feels like temperature, cloud coverage, humidity, wind speed, and a daily weather summary. The application is designed to run every day at 11:59 PM, automatically updating the weather summary.

Features --> 
Select a city from the dropdown to view real-time weather data.
View daily weather summaries with maximum, minimum, and average temperatures.
Data updates every day at 11:59 PM.
Toggle between Celsius and Fahrenheit for temperature display.

Dependencies--> 

Backend Dependencies--
Node.js: Server environment.
Express: Web framework for Node.js.
MongoDB: NoSQL database to store weather data.
Mongoose: ODM for MongoDB.
Axios: Promise-based HTTP client for the browser and Node.js.
Node-cron: Scheduler for task scheduling.
Winston: Logging library for Node.js.
Nodemon: Utility that monitors for changes in the code and automatically restarts the server.

Frontend Dependencies--
React: JavaScript library for building user interfaces.
React-DOM: Serves as the entry point to the DOM and server renderers for React.
React-Scripts: Configuration and scripts for Create React App.
Axios: Promise-based HTTP client for making API requests.
React-Select: A flexible and customizable React dropdown component.

Setup Instructions-->
Backend Setup
Install Node.js: Ensure Node.js is installed on your machine. You can download it from Node.js.
Install MongoDB: Set up MongoDB on your local machine or use a cloud-based MongoDB service.
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/weather-monitoring-app.git
Navigate to the backend directory:
bash
Copy code
cd weather-monitoring-app/backend
Install backend dependencies:
bash
Copy code
npm install
Start the backend server:
bash
Copy code
nodemon server.js
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install frontend dependencies:
bash
Copy code
npm install
Start the frontend server:
bash
Copy code
npm start
Access the application: Open your browser and navigate to http://localhost:3000.

How the Application Works --> 
City Selection: Use the dropdown menu to select a city. The application fetches and displays the latest weather data for the selected city.
Weather Data: The weather data includes temperature, feels like temperature, cloud coverage, humidity, and wind speed.
Daily Summary: The application aggregates weather data collected throughout the day and displays a summary at 11:59 PM every day.
Automatic Updates: The backend server runs a scheduled task every day at 11:59 PM to aggregate the weather data and update the summary.
Cron Job
Time: The application runs a cron job at 11:59 PM every day.
Task: Aggregates weather data for the day and stores it in the MongoDB database.

Conclusion--> 
This Weather Monitoring Application provides real-time weather data for multiple cities and automatically updates daily weather summaries. It is built using the MERN stack (MongoDB, Express, React, Node.js) and leverages various libraries and tools for efficient performance and scalability.

NOTE- All the data of this application will be stored in the cluster created in the MongoDb link --> https://cloud.mongodb.com/v2/66bcfec95e8a6d7991f71f7b#/metrics/replicaSet/66bcffa21704a102ff4b1869/explorer/test/rollups/find
