// types/menubarStates.ts
import type { Editor } from "@tiptap/core";

type MenuBarState = {
  isBold: boolean;
  canBold: boolean;
  isItalic: boolean;
  canItalic: boolean;
  isStrike: boolean;
  canStrike: boolean;
  isCode: boolean;
  canCode: boolean;
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isHeading4: boolean;
  isHeading5: boolean;
  isHeading6: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
  canUndo: boolean;
  canRedo: boolean;
};

export const menuBarStateSelector = (ctx: { editor: Editor | null }): MenuBarState => {
  if (!ctx.editor) {
    // guard against null
    return {
      isBold: false,
      canBold: false,
      isItalic: false,
      canItalic: false,
      isStrike: false,
      canStrike: false,
      isCode: false,
      canCode: false,
      isParagraph: false,
      isHeading1: false,
      isHeading2: false,
      isHeading3: false,
      isHeading4: false,
      isHeading5: false,
      isHeading6: false,
      isBulletList: false,
      isOrderedList: false,
      isCodeBlock: false,
      isBlockquote: false,
      canUndo: false,
      canRedo: false,
    };
  }

  return {
    isBold: ctx.editor.isActive("bold"),
    canBold: ctx.editor.can().chain().toggleBold().run(),
    isItalic: ctx.editor.isActive("italic"),
    canItalic: ctx.editor.can().chain().toggleItalic().run(),
    isStrike: ctx.editor.isActive("strike"),
    canStrike: ctx.editor.can().chain().toggleStrike().run(),
    isCode: ctx.editor.isActive("code"),
    canCode: ctx.editor.can().chain().toggleCode().run(),
    isParagraph: ctx.editor.isActive("paragraph"),
    isHeading1: ctx.editor.isActive("heading", { level: 1 }),
    isHeading2: ctx.editor.isActive("heading", { level: 2 }),
    isHeading3: ctx.editor.isActive("heading", { level: 3 }),
    isHeading4: ctx.editor.isActive("heading", { level: 4 }),
    isHeading5: ctx.editor.isActive("heading", { level: 5 }),
    isHeading6: ctx.editor.isActive("heading", { level: 6 }),
    isBulletList: ctx.editor.isActive("bulletList"),
    isOrderedList: ctx.editor.isActive("orderedList"),
    isCodeBlock: ctx.editor.isActive("codeBlock"),
    isBlockquote: ctx.editor.isActive("blockquote"),
    canUndo: false,
    canRedo: false,
  };
};
