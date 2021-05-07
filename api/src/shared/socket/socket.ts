import { updateUserSocket } from "./registerSocket";

module.exports = (io: any, socket: any) => {
  const update = function (payload: any) {
    updateUserSocket(payload, socket.id);
  };
  socket.on("order:update", update);
}