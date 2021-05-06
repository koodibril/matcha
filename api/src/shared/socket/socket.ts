import { updateUserSocket } from "./registerSocket";

module.exports = (io: any, socket: any) => {
  const test = function (payload: any) {
    console.log("hghghghghgh");
  };
  const update = function (payload: any) {
    updateUserSocket(payload, socket.id);
  };
  socket.on("order:test", test);
  socket.on("order:update", update);
}