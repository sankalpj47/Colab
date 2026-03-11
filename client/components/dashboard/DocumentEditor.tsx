"use client";

import * as Y from "yjs";
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
import { destroyCollaborationInstance, getCollaborationInstance } from "@/utils/collaboration.util";

const DocumentEditor = ({
  documentId,
  currentUser,
  initialContent,
  isReadOnly = false,
  onSaveStatusChange,
}: {
  documentId: string;
  currentUser: { name: string; color: string };
  initialContent?: string;
  isReadOnly?: boolean;
  onSaveStatusChange?: (status: "saving" | "saved" | "error") => void;
}) => {
  const { ydoc, provider } = getCollaborationInstance(documentId, initialContent);

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
    editable: !isReadOnly, // disable editing for viewers
    immediatelyRender: false,
  });

  // Auto-save — skip entirely for viewers
  useEffect(() => {
    if (isReadOnly) return;

    let timeout: NodeJS.Timeout;

    const handleUpdate = (_update: Uint8Array, origin: unknown) => {
      // only save updates that originated locally, not from WebSocket
      // this prevents every client from saving when one client types
      if (origin === provider) return;

      clearTimeout(timeout);
      onSaveStatusChange?.("saving");

      timeout = setTimeout(async () => {
        try {
          const update = Y.encodeStateAsUpdate(ydoc);
          const base64 = btoa(String.fromCharCode(...update));
          await api.patch(`/document/${documentId}/save`, {
            content: base64,
          });
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
  }, [ydoc, isReadOnly]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      destroyCollaborationInstance(documentId);
    };
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
        {/* hide toolbar for viewers */}
        {!isReadOnly && <MenuBar editor={editor!} />}
        {isReadOnly && (
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            View only
          </span>
        )}
      </div>
      <div className="rounded-b-md px-8 py-6 min-h-[60vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default DocumentEditor;
