/**
 * Author:Diego Casallas
 * Date: 2025-05-27
 * Description: 
*/
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/* The routers are imported to handle specific routes in the application.*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import tokenRouter from '../routers/token.router.js';
import adminRouter from '../routers/admin.router.js';
import playerRouter from '../routers/player.router.js';
import gameRouter from '../routers/game.router.js';
import magicRouter from '../routers/magic.router.js';
import powerRouter from '../routers/power.router.js';
import raceRouter from '../routers/race.router.js';
import warriorTypeRouter from '../routers/warrior_type.router.js';
import warriorRouter from '../routers/warrior.router.js';
import playerGameRouter from '../routers/player_game.router.js';
import gamePlayerWarriorRouter from '../routers/game_player_warrior.router.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos para las imágenes de guerreros
app.use('/uploads/warriors', express.static(path.join(__dirname, '../data/uploads/warriors')));

// Prefix for all profile routes, facilitating scalability

app.use('/api_v1',tokenRouter);
app.use('/api_v1',adminRouter);
app.use('/api_v1',playerRouter);
app.use('/api_v1',gameRouter);
app.use('/api_v1',magicRouter);
app.use('/api_v1',powerRouter);
app.use('/api_v1',raceRouter);
app.use('/api_v1',warriorTypeRouter);
app.use('/api_v1',warriorRouter);
app.use('/api_v1',playerGameRouter);
app.use('/api_v1', gamePlayerWarriorRouter);


app.use((rep, res, nex) => {
  res.status(404).json({
    message: 'Endpoint losses'
  });
});

export default app;