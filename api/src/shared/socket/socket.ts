import { disconnectSocket } from "./disconnectSocket";
import { updateUserSocket } from "./registerSocket";

module.exports = (io: any, socket: any) => {
  const update = function (payload: any) {
    updateUserSocket(payload, socket.id);
  };
  const disconnect = function (payload: any) {
    disconnectSocket(socket.id);
  }
  socket.on("order:update", update);
  socket.on("disconnect", disconnect);
}