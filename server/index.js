import "./config/config.js";
import express from "express";
import http from "http";
import Router from "./routes.js";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors());
app.use(express.json());
app.use(Router);

// socket
let users = [];
const io = new Server(server, { cors: { origin: "*" } });

io.on("connect", socket => {
    console.log("User Connected: " + socket.id);

    socket.on("join", email => {
        users = users.filter(user => user.email !== email);
        users.push({ email, socketId: socket.id });
    });

    socket.on("sendMessage", message => {
        const socketId = users.find(user => user.email === message.to)?.socketId;
        io.to(socketId).emit("recieveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("User Disconected: " + socket.id);
    });

});

// listen
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("Listening on PORT: " + PORT));