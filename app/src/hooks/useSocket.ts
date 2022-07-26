import socketClient  from "socket.io-client";
const SERVER = ""
export const socket = socketClient(SERVER);