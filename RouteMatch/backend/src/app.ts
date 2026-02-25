import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import apiRoutes from './api';
import { initializeFirebase } from './config/firebase';
import { initializeMapbox } from './config/mapbox';
import socketHandler from './websocket/handler';

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initializeFirebase();
initializeMapbox();

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'routematch-backend' });
});

app.use('/api', apiRoutes);

const httpServer = createServer(app);
socketHandler(httpServer);

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
