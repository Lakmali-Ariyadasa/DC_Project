const http = require('http');

const args = process.argv;

// Skipping the first two default arguments (node and the script filename)
const passedArgs = args.slice(2);

// Assuming that passing a single variable value
const nodeValue = passedArgs[0];

console.log("Side car Port:", nodeValue);

 // Function to start a server on a specified port

      
const server = http.createServer((req, res) => {
      console.log(`date:[${new Date().toISOString()}] ${req.method} ${req.url}`);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(`Server running on port ${nodeValue}\n`);
    });

    server.listen(nodeValue, () => {
      console.log(`Server is running on http://localhost:${nodeValue}`);
    });




// const express = require('express');
// const axios = require('axios');

// const app = express();
// const args = process.argv;

// // Skipping the first two default arguments (node and the script filename)
// const passedArgs = args.slice(2);

// // Assuming that passing a single variable value
// const PORT = passedArgs[0];

// console.log("Passed variable value:", PORT);

// const data = {
//     nodeName: `Node on port ${PORT}` 
// };

// // Middleware for logging incoming requests
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });

// // Route for handling broadcast messages from nodes
// app.post('/broadcast', (req, res) => {
//     console.log('Received broadcast message:', req.body);
//     res.send('Broadcast received successfully');
// });

// // Start the Express server
// // app.listen(PORT, () => 

// //     // After starting the server, send a broadcast message
// //     axios.post(`http://localhost:${PORT}/broadcast`, data)
// //         .then(response => {
// //             console.log('Broadcast successful:', response.data);
// //         })
// //         .catch(error => {
// //             console.error('Error broadcasting message:', error);
// //         })
// // )

//   server.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });