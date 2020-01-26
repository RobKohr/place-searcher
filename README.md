# Node Assessment Coding Challenge

## Installation Instructions

1. `cp ./config/default.json ./config/local.json`
2. Replace the API keys with the ones for the places in ./config/local.json
3. `npm install`
4. `npm install -g mocha`
5. `npm test`

## Requirements

1. Return project within 48 hours of receipt, even if incomplete
2. Send project via email in a zipped folder, or send link to git repo

## Resources:

https://developers.google.com/places/web-service/search
Reach out to team as needed with questions

## Tech Requirements:

1. Build a server-side application in NodeJS that utilizes Google's place search API:
   https://developers.google.com/places/web-service/search
2. Application should support requesting Google's API w/ params: latitude, longitude, number of locations,
   type (either bank or atm or all), response output type, and language, and return an array of locations.
3. Project should require input parameters: latitude, longitude, and customer name
4. API Key should be masked or part of config, not in params as clear text
5. Incorporate TDD or unit testing practices
6. ES6 support required
7. Data should not be hard coded within functions
8. Extra credit: Incorporate linting
