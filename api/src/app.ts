import express from 'express';

import user from './modules/user/user';
import chat from './modules/chat/chat';
import notifications from './modules/notifications/notifications';
import profile from './modules/profile/profile';
import relationship from './modules/relationship/relationship';
import research from './modules/research/research';
import { zergRush } from './shared/neo4j/seeder';
//import { relaseTheKraken } from './shared/neo4j/querytester';

const app = express();
app.use(express.static('public'));
const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Headers', "*");
  next();
};

app.use(allowCrossDomain);

app.use(express.json({ limit: '1mb' }));

app.use('/api/auth/*', user);
app.use('/api/chat/*', chat);
app.use('/api/notifications/*', notifications);
app.use('/api/profile', profile);
app.use('/api/relationship', relationship);
app.use('/api/search', research);

app.use('/api/zerg', zergRush);
//relaseTheKraken('coucou');

export default app;