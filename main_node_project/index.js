const { exec } = require('child_process');

const portfinder = require('portfinder');
const http = require('http');

portfinder.getPort((err, port) => {
    if (err) {
        console.error('Error finding port:', err);
        return;
    }

    const startingPort = port; 
    findNextFivePorts(startingPort);

var scriptSystem = exec(`node E:/Msc/DC/DC_Project/system_node_project/index.js ${startingPort}`, 
        (error, stdout, stderr) => {
            console.log(stdout,"stdout1");
            console.log(stderr,"stderr1");
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
    });

    // Function to start a server on a specified port
function startServer(startingPort) {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello, world! Server running on port ${startingPort}\n`);
    });

    server.listen(startingPort, () => {
        console.log(`Server is running on http://localhost:${startingPort}`);
    });
}

// Function to find and start the next five available ports
function findNextFivePorts(startingPort) {
    const numberOfPorts = 5;
    let currentPort = startingPort;

    for (let i = 0; i < numberOfPorts; i++) {
        portfinder.getPort({
            port: currentPort
        }, (err, startingPort) => {
            if (err) {
                console.error('Error finding port:', err);
                return;
            }
            startServer(startingPort);
        });

        // Increment currentPort for the next iteration
        currentPort++;
    }
}

})