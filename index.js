import express from "express";
import bodyParser from "body-parser";
import { Socket } from "socket.io";
import http from "http";
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
 res.render("index.ejs");
});

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
});