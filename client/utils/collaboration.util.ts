import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { WEBSOCKET_URL } from "@/config/constants";

const ydocMap = new Map<string, Y.Doc>();
const providerMap = new Map<string, WebsocketProvider>();
const refCountMap = new Map<string, number>();

export const getCollaborationInstance = (
  documentId: string,
  initialContent?: string
) => {
  if (!ydocMap.has(documentId)) {
    const ydoc = new Y.Doc();

    if (initialContent) {
      try {
        const binary = Uint8Array.from(atob(initialContent), (c) =>
          c.charCodeAt(0)
        );
        Y.applyUpdate(ydoc, binary);
      } catch (e) {
        console.error("Failed to rehydrate Yjs state:", e);
      }
    }

    const provider = new WebsocketProvider(WEBSOCKET_URL, documentId, ydoc, {
      connect: true,
    });

    // provider.on("status", (event: { status: string }) => {
    //   console.log("WebSocket status:", event.status);
    // });

    // provider.on("sync", (isSynced: boolean) => {
    //   console.log("Yjs synced:", isSynced);
    // });

    ydocMap.set(documentId, ydoc);
    providerMap.set(documentId, provider);
    refCountMap.set(documentId, 0);
  }

  refCountMap.set(documentId, (refCountMap.get(documentId) ?? 0) + 1);

  return {
    ydoc: ydocMap.get(documentId)!,
    provider: providerMap.get(documentId)!,
  };
};

export const destroyCollaborationInstance = (documentId: string) => {
  const count = (refCountMap.get(documentId) ?? 1) - 1;
  refCountMap.set(documentId, count);

  if (count <= 0) {
    providerMap.get(documentId)?.destroy();
    providerMap.delete(documentId);
    ydocMap.get(documentId)?.destroy();
    ydocMap.delete(documentId);
    refCountMap.delete(documentId);
  }
};