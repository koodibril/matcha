import express from 'express';
import path from 'path';

import user from './modules/user/user';
import chat from './modules/chat/chat';
import notifications from './modules/notifications/notifications';
import profile from './modules/profile/profile';
import relationship from './modules/relationship/relationship';
import research from './modules/research/research';
import { zergRush } from './shared/neo4j/seeder';

const app = express();
app.use(express.static('public'));
const env = process.env.NODE_ENV || 'development';
if (env !== 'development') {
	app.use(express.static(path.join(__dirname, 'build')));
	app.get('/*', (req, res) => {
	  res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
}
const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Headers', "*");
  next();
};

app.use(allowCrossDomain);

app.use(express.json({ limit: '1mb' }));

app.use('/api/auth', user);
app.use('/api/chat', chat);
app.use('/api/notifications', notifications);
app.use('/api/profile', profile);
app.use('/api/relationship', relationship);
app.use('/api/search', research);
app.use('/api/zerg', zergRush);

export default app;