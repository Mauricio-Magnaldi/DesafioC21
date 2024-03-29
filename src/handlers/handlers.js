//import productManager from "../dao/mongoDB/managers/productsManager.js";
//import messageManager from "../dao/mongoDB/managers/messagesManager.js";

async function getAllProductsHandler(io, socket) {
  socket.on("getAllProducts", async () => {
    const products = await productManager.getAll();
    io.sockets.emit("updatedProducts", products);
  });
}

async function messagesHandler(io, socket) {
  socket.on("messageSent", async (message) => {
    await messageManager.create(message);
    const messages = await messageManager.getAll();
    io.sockets.emit("newMessages", messages);
  });

  socket.on("getMessages", async () => {
    const messages = await messageManager.getAll();
    io.sockets.emit("newMessages", messages);
  });
}

export { getAllProductsHandler, messagesHandler };
