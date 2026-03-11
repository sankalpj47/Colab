"use client";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { MenuBar } from "./Menubar";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import api from "@/utils/axios.util";

const ydocMap = new Map<string, Y.Doc>();
const providerMap = new Map<string, WebsocketProvider>();
const refCountMap = new Map<string, number>();

const getOrCreate = (documentId: string, initialContent?: string) => {
  if (!ydocMap.has(documentId)) {
    const ydoc = new Y.Doc();

    if (initialContent) {
      try {
        const binary = Uint8Array.from(atob(initialContent), (c) => c.charCodeAt(0));
        Y.applyUpdate(ydoc, binary);
      } catch (e) {
        console.error("Failed to rehydrate Yjs state:", e);
      }
    }

    const provider = new WebsocketProvider(
      "ws://localhost:8000",
      documentId,
      ydoc,
      { connect: true }
    );

    provider.on("status", (event: { status: string }) => {
      console.log("WebSocket status:", event.status);
    });

    provider.on("sync", (isSynced: boolean) => {
      console.log("Yjs synced:", isSynced);
    });

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

const cleanup = (documentId: string) => {
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

const DocumentEditor = ({
  documentId,
  currentUser,
  initialContent,
  onSaveStatusChange,
}: {
  documentId: string;
  currentUser: { name: string; color: string };
  initialContent?: string;
  onSaveStatusChange?: (status: "saving" | "saved" | "error") => void;
}) => {
  const { ydoc, provider } = getOrCreate(documentId, initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: currentUser,
        render: (user: { name: string; color: string }) => {
          const cursor = document.createElement("span");
          cursor.classList.add("collab-cursor");

          const caret = document.createElement("span");
          caret.classList.add("collab-caret");
          caret.style.borderColor = user.color;

          const label = document.createElement("span");
          label.classList.add("collab-label");
          label.style.backgroundColor = user.color;
          label.textContent = user.name;

          cursor.appendChild(caret);
          cursor.appendChild(label);
          return cursor;
        },
      }),
      TextStyle,
      Color,
      Placeholder.configure({ placeholder: "Start writing..." }),
    ],
    immediatelyRender: false,
  });

  // Auto-save
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleUpdate = () => {
      clearTimeout(timeout);
      onSaveStatusChange?.("saving");

      timeout = setTimeout(async () => {
        try {
          const update = Y.encodeStateAsUpdate(ydoc);
          const base64 = btoa(String.fromCharCode(...update));
          // await api.patch(`/document/${documentId}/save`, {
          //   content: base64,
          //   type: "yjs",
          // });
          onSaveStatusChange?.("saved");
        } catch {
          onSaveStatusChange?.("error");
        }
      }, 2000);
    };

    ydoc.on("update", handleUpdate);

    return () => {
      clearTimeout(timeout);
      ydoc.off("update", handleUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ydoc]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup(documentId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  return (
    <div
      className="border rounded-md"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--canvas)" }}
    >
      <div
        className="rounded-t-md border-b px-3 py-2"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--canvas)" }}
      >
        <MenuBar editor={editor!} />
      </div>
      <div className="rounded-b-md px-8 py-6 min-h-[60vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default DocumentEditor;