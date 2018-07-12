const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
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


wss.on('connection', (ws) => {
  //when a new client connects, notify the app
  console.log('Client connected');
  let numMsg = {
    type: "numClients",
    numClients: wss.clients.size
  }
  wss.broadcast(JSON.stringify(numMsg));

  ws.on("message", data => {
    //when  a new message is received, add the user ID and notify the app
    const msg = JSON.parse(data);
    msg.id = uuidv4();
    console.log(`User ${msg.username} said ${msg.content}`);
    wss.broadcast(JSON.stringify(msg))
  });


  //when a client disconnects, notify the app
  ws.on('close', () => {
    console.log('Client disconnected')
    let numMsg = {
    type: "numClients",
    numClients: wss.clients.size
    }
  wss.broadcast(JSON.stringify(numMsg));
  });

});
