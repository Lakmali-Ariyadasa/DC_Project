const express = require('express');
const axios = require('axios');

const app = express();
const args = process.argv;

// Skipping the first two default arguments (node and the script filename)
const passedArgs = args.slice(2);

// Assuming that passing a single variable value
const PORT = passedArgs[0];

const data = {
    nodeName: `Node on port ${PORT}` 
};

// Middleware for logging incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Route for handling broadcast messages from nodes
app.post('/broadcast', (req, res) => {
    // Process the broadcast message (e.g., update node table)
    // For demonstration purposes, just log the received data
    console.log('Received broadcast message:', req.body);
    res.send('Broadcast received successfully');
});

// Start the Express server
// app.listen(PORT, () => 

    // After starting the server, send a broadcast message
    axios.post(`http://localhost:${PORT}/broadcast`, data)
        .then(response => {
            console.log('Broadcast successful:', response.data);
        })
        .catch(error => {
            console.error('Error broadcasting message:', error);
        });
// });
