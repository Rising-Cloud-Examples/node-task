const fs = require('fs');

let rawdata = fs.readFileSync('./request.json');
let input = JSON.parse(rawdata);
input.number = input.number * 10;

console.log(input);

let data = JSON.stringify(input);
fs.writeFileSync('./response.json', data);