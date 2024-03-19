const { exec } = require('child_process');
var yourscript = exec('D:/Lakmali/DC_Project/system_node_project/hi.sh',
        (error, stdout, stderr) => {
            console.log(stdout,"stdout1");
            console.log(stderr,"stderr1");
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
    });

const http = require('http');
const portfinder = require('portfinder');

// Function to start a server on a specified port
function startServer(port) {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello, world! Server running on port ${port}\n`);
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Function to find and start the next five available ports
function findNextFivePorts(startingPort) {
    const numberOfPorts = 5;
    let currentPort = startingPort;

    for (let i = 0; i < numberOfPorts; i++) {
        portfinder.getPort({
            port: currentPort
        }, (err, port) => {
            if (err) {
                console.error('Error finding port:', err);
                return;
            }
            startServer(port);
        });

        // Increment currentPort for the next iteration
        currentPort++;
    }
}

// Call findNextFivePorts function with a starting port

portfinder.getPort((err, port) => {
    if (err) {
        console.error('Error finding port:', err);
        return;
    }

    const startingPort = port; 
    findNextFivePorts(startingPort);
})
