import { WebSocketServer } from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";
import { Server } from "http";
import logger from "../config/logger.config";
import { ALLOWED_ORIGINS } from "../config/constants.config";

const initWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (conn, req) => {
    // CORS check
    const origin = req.headers.origin;
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      logger.warn(`WebSocket connection rejected from origin: ${origin}`);
      conn.close();
      return;
    }

    // safe URL parsing
    const { pathname } = new URL(req.url!, "http://localhost");
    const docId = pathname.split("/").filter(Boolean).pop() ?? "default";

    logger.debug(`WebSocket connection for document: ${docId}`);
    setupWSConnection(conn, req, { docName: docId });
  });
};

export default initWebSocketServer;