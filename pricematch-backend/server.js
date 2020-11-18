"use strict";
//Load HTTP module
const http = require("http");
var app = require("./app");

const port = 3010;

app.set("port", port); //app is the requestListener

const server = http.createServer(app);

server.listen(port);
console.log("Listen on localhost:", port);

var io = require("socket.io")(server); //create a websocket server to run in the same app
app.set("socket-io", io);
module.exports = server;
