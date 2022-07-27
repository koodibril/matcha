import socketClient  from "socket.io-client";
const SERVER = process.env.REACT_APP_API_URI;
export const socket = socketClient(SERVER!);