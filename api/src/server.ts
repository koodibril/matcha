import http from 'http';
import app from './app';
import { config as dotenvConfig } from 'dotenv';

const server = http.createServer(app);

const normalizePort = (val: string | number) => {
  const normalizedPort = parseInt((val as string), 10) || (val as number);

  if (isNaN(normalizedPort)) return val;
  if (normalizedPort >= 0) return normalizedPort;
  return false;
}

dotenvConfig();
const port = normalizePort(process.env.PORT || '3001');
const getBind = () => typeof server.address() === 'string'
  ? `pipe${server.address()}`
  : `port ${port}`;

app.set('port', port);

const errorHandler = (error: any) => {
  if (error.syscall !== 'lister') throw error;
  const bind = getBind();

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

server.on('error', errorHandler);
server.on('listening', () => console.log(`Listening on ${getBind()}`));
server.listen(port);