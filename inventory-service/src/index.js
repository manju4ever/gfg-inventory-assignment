const { default: initServer } = require("./server");

initServer()
  .then((server) => {
    logger.info(`Server started at ${server.info.uri}`);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(255);
  });

// Catch Unhandled Rejections Globally
process.on("unhandledRejection", (reason, p) => {
  logger.error(
    "\n[Promise Rejection] (System Level at the best) at Promise: ",
    p,
    "Reason:",
    reason,
    "\n"
  );
});
