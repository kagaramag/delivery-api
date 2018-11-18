import  http from "http";

import app from './app';

const port = process.env.PORT || 3100;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server starts on port: ${port}`)
});

