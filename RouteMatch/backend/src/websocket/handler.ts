// This file handles WebSocket connections, managing real-time communication between clients and the server.

import { Server } from 'socket.io';

const socketHandler = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Handle incoming messages from clients
        socket.on('message', (data) => {
            console.log('Message received:', data);
            // Broadcast the message to all connected clients
            io.emit('message', data);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

export default socketHandler;