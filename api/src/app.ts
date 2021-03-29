import express from 'express';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import relationshipRoutes from './routes/relationship';
import searchRoutes from './routes/research';
import chatRoutes from './routes/chat';
import notificationRoutes from './routes/notification';
import { generateQuery } from './shared/neo4j/querieMaker';

const app = express();
app.use(express.static('public'));
const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Headers', "*");
  next();
};

app.use(allowCrossDomain);

app.use(express.json({ limit: '1mb' }));
app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/relationship', relationshipRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
console.log(generateQuery(['create'], ['user'], [['name']], [], false));
console.log(generateQuery(['match'], ['user', 'action', 'user'], [['name'], [], ['name']], [], false));
console.log(generateQuery(['match', 'set'], ['user', 'action', 'user'], [['name'], [], ['token']], ['name'], false));
console.log(generateQuery(['match', 'create'], ['user', 'user'], [['name'], ['token']], ['action'], false));
console.log(generateQuery(['match', 'set'], ['user'], [['name']], ['mail'], false));

export default app;