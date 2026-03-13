"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { menuBarStateSelector } from "../../types/menubarStates";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  CodeSquare,
  TextQuote,
  Minus,
  WrapText,
  Undo2,
  Redo2,
  RemoveFormatting,
  Trash2,
} from "lucide-react";
import Tooltip from "../ui/Tootip";

type ToolbarButton = {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

type ToolbarGroup = ToolbarButton[];

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({ editor, selector: menuBarStateSelector });

  if (!editor) return null;

  const groups: ToolbarGroup[] = [
    [
      {
        icon: <Bold className="w-3.5 h-3.5" />,
        label: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: editorState.isBold,
        disabled: !editorState.canBold,
      },
      {
        icon: <Italic className="w-3.5 h-3.5" />,
        label: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: editorState.isItalic,
        disabled: !editorState.canItalic,
      },
      {
        icon: <Strikethrough className="w-3.5 h-3.5" />,
        label: "Strike",
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: editorState.isStrike,
        disabled: !editorState.canStrike,
      },
      {
        icon: <Code className="w-3.5 h-3.5" />,
        label: "Inline code",
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: editorState.isCode,
        disabled: !editorState.canCode,
      },
    ],
    [
      {
        icon: <Heading1 className="w-3.5 h-3.5" />,
        label: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editorState.isHeading1,
      },
      {
        icon: <Heading2 className="w-3.5 h-3.5" />,
        label: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editorState.isHeading2,
      },
      {
        icon: <Heading3 className="w-3.5 h-3.5" />,
        label: "Heading 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editorState.isHeading3,
      },
      {
        icon: <Heading4 className="w-3.5 h-3.5" />,
        label: "Heading 4",
        action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: editorState.isHeading4,
      },
      {
        icon: <Heading5 className="w-3.5 h-3.5" />,
        label: "Heading 5",
        action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: editorState.isHeading5,
      },
      {
        icon: <Heading6 className="w-3.5 h-3.5" />,
        label: "Heading 6",
        action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: editorState.isHeading6,
      },
    ],
    [
      {
        icon: <Pilcrow className="w-3.5 h-3.5" />,
        label: "Paragraph",
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: editorState.isParagraph,
      },
      {
        icon: <List className="w-3.5 h-3.5" />,
        label: "Bullet list",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editorState.isBulletList,
      },
      {
        icon: <ListOrdered className="w-3.5 h-3.5" />,
        label: "Ordered list",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editorState.isOrderedList,
      },
      {
        icon: <CodeSquare className="w-3.5 h-3.5" />,
        label: "Code block",
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editorState.isCodeBlock,
      },
      {
        icon: <TextQuote className="w-3.5 h-3.5" />,
        label: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: editorState.isBlockquote,
      },
      {
        icon: <Minus className="w-3.5 h-3.5" />,
        label: "Divider",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
      {
        icon: <WrapText className="w-3.5 h-3.5" />,
        label: "Hard break",
        action: () => editor.chain().focus().setHardBreak().run(),
      },
    ],
    [
      {
        icon: <RemoveFormatting className="w-3.5 h-3.5" />,
        label: "Clear marks",
        action: () => editor.chain().focus().unsetAllMarks().run(),
      },
      {
        icon: <Trash2 className="w-3.5 h-3.5" />,
        label: "Clear nodes",
        action: () => editor.chain().focus().clearNodes().run(),
      },
    ],
    [
      {
        icon: <Undo2 className="w-3.5 h-3.5" />,
        label: "Undo",
        action: () => editor.chain().focus().undo().run(),
        disabled: !editorState.canUndo,
      },
      {
        icon: <Redo2 className="w-3.5 h-3.5" />,
        label: "Redo",
        action: () => editor.chain().focus().redo().run(),
        disabled: !editorState.canRedo,
      },
    ],
  ];

  return (
    <div
      className="sticky top-0 z-10"
      style={{ backgroundColor: "var(--canvas)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto scrollbar-hide">
        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5 shrink-0">
            {group.map((btn) => (
              <Tooltip key={btn.label} label={btn.label}>
                <button
                  onClick={btn.action}
                  disabled={btn.disabled}
                  className="w-7 h-7 flex items-center justify-center rounded transition-all duration-100 disabled:opacity-25 disabled:cursor-not-allowed shrink-0"
                  style={{
                    color: btn.isActive ? "#ffffff" : "var(--text-secondary)",
                    backgroundColor: btn.isActive ? "var(--primary)" : "transparent",
                    boxShadow: btn.isActive ? "0 1px 3px rgba(37,99,235,0.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!btn.isActive && !btn.disabled)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
                    if (!btn.isActive && !btn.disabled)
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!btn.isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {btn.icon}
                </button>
              </Tooltip>
            ))}

            {gi < groups.length - 1 && (
              <div
                className="w-px h-4 mx-1 shrink-0"
                style={{ backgroundColor: "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
