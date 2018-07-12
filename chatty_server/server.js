const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let numMsg = {
    type: "numClients",
    numClients: wss.clients.size

  }
  wss.broadcast(JSON.stringify(numMsg));

  ws.on("message", data => {
    const msg = JSON.parse(data);
    msg.id = uuidv4();
    console.log(`User ${msg.username} said ${msg.content}`);
    wss.broadcast(JSON.stringify(msg))
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    let numMsg = {
    type: "numClients",
    numClients: wss.clients.size
    }
  wss.broadcast(JSON.stringify(numMsg));
  });

});
