import express from 'express';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import relationshipRoutes from './routes/relationship';
import searchRoutes from './routes/research';

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

export default app;