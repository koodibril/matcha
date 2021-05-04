module.exports = (io: any, socket: any) => {
  const test = function (payload: any) {
    console.log("hghghghghgh");
  };
  socket.on("order:test", test);
}