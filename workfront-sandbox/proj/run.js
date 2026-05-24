// Load the 'fs' module to read files
const fs = require('fs');

// Path to your JSON file (make sure it's in the same directory)
const filePath = './proj1.tasks.json';

// Read and parse the JSON file
const rawData = fs.readFileSync(filePath);
const jsonData = JSON.parse(rawData);

// Print JSON data as a table in console
console.table(jsonData);
