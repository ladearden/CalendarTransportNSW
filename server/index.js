const express = require('express');
const app = express();
const cors = require('cors')

const API_URL = 'https://api.transport.nsw.gov.au/v1/tp/add_info?outputFormat=rapidJSON&filterDateValid=01-10-2016&version=10.2.1.42';


const https = require("https");

const Stream = require("stream").Transform;
const fs = require("fs");



const options = {
    hostname: 'api.transport.nsw.gov.au',
    port: 443,
    method: 'GET',
    path: '/v1/tp/add_info?outputFormat=rapidJSON',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'apikey JFvTrgFL93bkkQ212NpTevp8a1I7f3ugaSdo'
    },
    origin: 'https://opendata.transport.nsw.gov.au',
  };



function httprequest() {
 return new Promise((resolve, reject) => {
    // const options = {
    //     host: 'jsonplaceholder.typicode.com',
    //     path: '/todos',
    //     port: 443,
    //     method: 'GET'
    // };
    const req = https
    .get(options, res => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
    
      let error;
      // Any 2xx status code signals a successful response but
      // here we're only checking for 200.
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }
    
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log("Data parsed");
            resolve(parsedData);
    } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
   req.end();
});
}

// const getAlerts = async () => {
//     const data = await fetch(API_URL, {
//         headers: {
//             'Authorization': 'JFvTrgFL93bkkQ212NpTevp8a1I7f3ugaSdo'
//         }
//     });

//     //const { photos } = await data.json();
//     return await data.json();
// }

app.use(cors({
  origin: "*",
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}))

//console.log(hrequest);

app.get('/api', (req, res) => {
    httprequest().then((data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        res.status(200).send(JSON.stringify(data));
        console.log('httpReq promise');
    return response;
    });
    console.log('httpReq end');

});

app.listen(3300, () => console.log("listening on port 3300..."));

