var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

var PORT = process.env.PORT || process.env.NODE_PORT || 3000;

app.listen(PORT);

var myScore = 0;

function handler (req, res) {
  fs.readFile(__dirname + '/../client/index.html', function (err, data) {
    
	if (err) {
      throw err;
    }
	
    res.writeHead(200);
    res.end(data);
	
  });
}

io.on('connection', function (socket) {

  socket.join('room1');

  socket.on('updatemyScore', function(data) {
    //add to myScore
    myScore += data;  
    
    io.sockets.in('room1').emit('updated', myScore); 
  });
  
  socket.on('disconnect', function(data) {
    socket.leave('room1');
  });
});

console.log("listening on port 3000");