import express from "express";
import bodyParser from "body-parser";
// import socketio from "socket.io";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const port = 3000;
const httpServer = createServer(app);
const io = new Server(httpServer);
                                                      
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
       io.emit("receive-location", {id: socket.id, ...data})
    });

    socket.on("disconnect", () => {
        io.emit("User-disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
 res.render("index.ejs");
});

httpServer.listen(3000, () => {
    console.log(`Server is running on port ${port}`)
});