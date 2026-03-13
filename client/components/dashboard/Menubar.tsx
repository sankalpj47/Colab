"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { menuBarStateSelector } from "../../types/menubarStates";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Bold,
  Italic,
  Underline,
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
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Link,
  Link2Off,
  Image,
  Table,
  Subscript,
  Superscript,
  ChevronDown,
  Type,
} from "lucide-react";
import Tooltip from "../ui/Tootip";

// ─── Constants ────────────────────────────────────────────────────────────────
const HIGHLIGHT_COLORS = [
  "#FEF08A",
  "#BBF7D0",
  "#BFDBFE",
  "#FDE68A",
  "#FBCFE8",
  "#DDD6FE",
  "#FED7AA",
  "#ffffff",
];

const TEXT_COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#2563EB",
  "#8B5CF6",
  "#EC4899",
  "#0F172A",
];

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Mono", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
];

// ─── Portal ───────────────────────────────────────────────────────────────────
const PopoverPortal = ({
  anchorRef,
  children,
  onClose,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
  }, [anchorRef]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        portalRef.current &&
        !portalRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);

  return createPortal(
    <div
      ref={portalRef}
      style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999 }}
    >
      {children}
    </div>,
    document.body
  );
};

// ─── PopoverTrigger ───────────────────────────────────────────────────────────
const PopoverTrigger = ({
  id,
  openPopover,
  onToggle,
  onClose,
  button,
  popover,
}: {
  id: string;
  openPopover: string | null;
  onToggle: () => void;
  onClose: () => void;
  button: React.ReactNode;
  popover: React.ReactNode;
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const isOpen = openPopover === id;

  return (
    <div ref={anchorRef} className="shrink-0">
      <div onClick={onToggle}>{button}</div>
      {isOpen && (
        <PopoverPortal anchorRef={anchorRef} onClose={onClose}>
          {popover}
        </PopoverPortal>
      )}
    </div>
  );
};

// ─── Color Picker ─────────────────────────────────────────────────────────────
const ColorPicker = ({
  colors,
  onSelect,
  onClose,
  current,
}: {
  colors: string[];
  onSelect: (color: string) => void;
  onClose: () => void;
  current?: string;
}) => (
  <div
    className="p-2 rounded-lg border grid grid-cols-4 gap-1.5"
    style={{
      backgroundColor: "var(--canvas)",
      borderColor: "var(--border)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    }}
  >
    {colors.map((c) => (
      <button
        key={c}
        onClick={() => {
          onSelect(c);
          onClose();
        }}
        className="w-6 h-6 rounded-md border-2 transition-transform hover:scale-110"
        style={{
          backgroundColor: c,
          borderColor: current === c ? "var(--primary)" : "var(--border)",
        }}
      />
    ))}
  </div>
);

// ─── Link Popover ─────────────────────────────────────────────────────────────
const LinkPopover = ({
  current,
  onSet,
  onRemove,
  onClose,
}: {
  current?: string;
  onSet: (url: string) => void;
  onRemove: () => void;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState(current ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="p-3 rounded-lg border flex flex-col gap-2"
      style={{
        backgroundColor: "var(--canvas)",
        borderColor: "var(--border)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        minWidth: "220px",
      }}
    >
      <input
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSet(url);
            onClose();
          }
          if (e.key === "Escape") onClose();
        }}
        placeholder="https://..."
        className="w-full px-2 py-1.5 text-xs font-mono rounded-md border outline-none"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            onSet(url);
            onClose();
          }}
          className="flex-1 py-1 text-xs font-mono rounded-md text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Apply
        </button>
        {current && (
          <button
            onClick={() => {
              onRemove();
              onClose();
            }}
            className="flex-1 py-1 text-xs font-mono rounded-md border"
            style={{ borderColor: "var(--border)", color: "var(--error)" }}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Image Popover ────────────────────────────────────────────────────────────
const ImagePopover = ({
  onInsert,
  onClose,
}: {
  onInsert: (src: string, alt: string) => void;
  onClose: () => void;
}) => {
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");

  return (
    <div
      className="p-3 rounded-lg border flex flex-col gap-2"
      style={{
        backgroundColor: "var(--canvas)",
        borderColor: "var(--border)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        minWidth: "240px",
      }}
    >
      <input
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        placeholder="Image URL..."
        className="w-full px-2 py-1.5 text-xs font-mono rounded-md border outline-none"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      />
      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        placeholder="Alt text (optional)"
        className="w-full px-2 py-1.5 text-xs font-mono rounded-md border outline-none"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      />
      <button
        onClick={() => {
          if (src) {
            onInsert(src, alt);
            onClose();
          }
        }}
        className="w-full py-1 text-xs font-mono rounded-md text-white disabled:opacity-50"
        style={{ backgroundColor: "var(--primary)" }}
        disabled={!src}
      >
        Insert image
      </button>
    </div>
  );
};

// ─── Table Popover ────────────────────────────────────────────────────────────
const TablePopover = ({
  onInsert,
  onClose,
}: {
  onInsert: (rows: number, cols: number) => void;
  onClose: () => void;
}) => {
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });
  const MAX = 6;

  return (
    <div
      className="p-3 rounded-lg border"
      style={{
        backgroundColor: "var(--canvas)",
        borderColor: "var(--border)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      <p className="text-[10px] font-mono mb-2" style={{ color: "var(--text-secondary)" }}>
        {hovered.rows > 0 ? `${hovered.rows} × ${hovered.cols}` : "Select size"}
      </p>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${MAX}, 1fr)` }}>
        {Array.from({ length: MAX * MAX }).map((_, idx) => {
          const r = Math.floor(idx / MAX) + 1;
          const c = (idx % MAX) + 1;
          const isActive = r <= hovered.rows && c <= hovered.cols;
          return (
            <div
              key={idx}
              className="w-5 h-5 rounded-sm border cursor-pointer transition-colors"
              style={{
                borderColor: isActive ? "var(--primary)" : "var(--border)",
                backgroundColor: isActive ? "#2563EB18" : "transparent",
              }}
              onMouseEnter={() => setHovered({ rows: r, cols: c })}
              onClick={() => {
                onInsert(r, c);
                onClose();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── Dropdown ─────────────────────────────────────────────────────────────────
const Dropdown = ({
  options,
  onSelect,
  onClose,
}: {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  onClose: () => void;
}) => (
  <div
    className="rounded-lg border overflow-hidden"
    style={{
      backgroundColor: "var(--canvas)",
      borderColor: "var(--border)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      minWidth: "120px",
    }}
  >
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => {
          onSelect(opt.value);
          onClose();
        }}
        className="w-full px-3 py-1.5 text-xs font-mono text-left transition-colors"
        style={{ color: "var(--text-primary)" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
        }
      >
        {opt.label}
      </button>
    ))}
  </div>
);

// ─── Toolbar Button ───────────────────────────────────────────────────────────
const ToolbarBtn = ({
  icon,
  label,
  action,
  isActive,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
}) => (
  <Tooltip label={label}>
    <button
      onClick={action}
      disabled={disabled}
      className="w-7 h-7 flex items-center justify-center rounded transition-all duration-100 disabled:opacity-25 disabled:cursor-not-allowed shrink-0"
      style={{
        color: isActive ? "#ffffff" : "var(--text-secondary)",
        backgroundColor: isActive ? "var(--primary)" : "transparent",
        boxShadow: isActive ? "0 1px 3px rgba(37,99,235,0.3)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!isActive && !disabled) {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
        }
      }}
    >
      {icon}
    </button>
  </Tooltip>
);

// ─── Separator ────────────────────────────────────────────────────────────────
const Sep = () => (
  <div className="w-px h-4 mx-1 shrink-0" style={{ backgroundColor: "var(--border)" }} />
);

// ─── Table Action Button ──────────────────────────────────────────────────────
const TableBtn = ({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <Tooltip label={label}>
    <button
      onClick={onClick}
      className="h-7 px-2 rounded text-[10px] font-mono transition-all shrink-0"
      style={{ color: danger ? "var(--error)" : "var(--text-secondary)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)")
      }
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
    >
      {label}
    </button>
  </Tooltip>
);

// ─── MenuBar ──────────────────────────────────────────────────────────────────
export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({ editor, selector: menuBarStateSelector });
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const toggle = (name: string) => setOpenPopover((p) => (p === name ? null : name));
  const close = () => setOpenPopover(null);

  if (!editor) return null;

  return (
    <div
      className="sticky top-0 z-10 border-b"
      style={{ backgroundColor: "var(--canvas)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto">
        {/* ── Text style ── */}
        <ToolbarBtn
          icon={<Bold className="w-3.5 h-3.5" />}
          label="Bold"
          action={() => editor.chain().focus().toggleBold().run()}
          isActive={editorState.isBold}
          disabled={!editorState.canBold}
        />
        <ToolbarBtn
          icon={<Italic className="w-3.5 h-3.5" />}
          label="Italic"
          action={() => editor.chain().focus().toggleItalic().run()}
          isActive={editorState.isItalic}
          disabled={!editorState.canItalic}
        />
        <ToolbarBtn
          icon={<Underline className="w-3.5 h-3.5" />}
          label="Underline"
          action={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editorState.isUnderline}
        />
        <ToolbarBtn
          icon={<Strikethrough className="w-3.5 h-3.5" />}
          label="Strike"
          action={() => editor.chain().focus().toggleStrike().run()}
          isActive={editorState.isStrike}
          disabled={!editorState.canStrike}
        />
        <ToolbarBtn
          icon={<Code className="w-3.5 h-3.5" />}
          label="Inline code"
          action={() => editor.chain().focus().toggleCode().run()}
          isActive={editorState.isCode}
          disabled={!editorState.canCode}
        />
        <ToolbarBtn
          icon={<Subscript className="w-3.5 h-3.5" />}
          label="Subscript"
          action={() => editor.chain().focus().toggleSubscript().run()}
          isActive={editorState.isSubscript}
        />
        <ToolbarBtn
          icon={<Superscript className="w-3.5 h-3.5" />}
          label="Superscript"
          action={() => editor.chain().focus().toggleSuperscript().run()}
          isActive={editorState.isSuperscript}
        />

        <Sep />

        {/* ── Text color ── */}
        <PopoverTrigger
          id="textColor"
          openPopover={openPopover}
          onToggle={() => toggle("textColor")}
          onClose={close}
          button={
            <Tooltip label="Text color">
              <button
                className="w-7 h-7 flex flex-col items-center justify-center rounded transition-all gap-0.5"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                }
              >
                <Type className="w-3 h-3" />
                <div
                  className="w-3.5 h-1 rounded-sm"
                  style={{ backgroundColor: editorState.currentColor ?? "var(--text-primary)" }}
                />
              </button>
            </Tooltip>
          }
          popover={
            <ColorPicker
              colors={TEXT_COLORS}
              current={editorState.currentColor}
              onSelect={(c) => editor.chain().focus().setColor(c).run()}
              onClose={close}
            />
          }
        />

        {/* ── Highlight ── */}
        <PopoverTrigger
          id="highlight"
          openPopover={openPopover}
          onToggle={() => toggle("highlight")}
          onClose={close}
          button={
            <Tooltip label="Highlight">
              <button
                className="w-7 h-7 flex flex-col items-center justify-center rounded transition-all gap-0.5"
                style={{
                  color: editorState.isHighlight ? "#ffffff" : "var(--text-secondary)",
                  backgroundColor: editorState.isHighlight ? "var(--primary)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!editorState.isHighlight)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
                }}
                onMouseLeave={(e) => {
                  if (!editorState.isHighlight)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Highlighter className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          }
          popover={
            <ColorPicker
              colors={HIGHLIGHT_COLORS}
              current={editorState.currentHighlightColor}
              onSelect={(c) => editor.chain().focus().toggleHighlight({ color: c }).run()}
              onClose={close}
            />
          }
        />

        <Sep />

        {/* ── Font family ── */}
        <PopoverTrigger
          id="fontFamily"
          openPopover={openPopover}
          onToggle={() => toggle("fontFamily")}
          onClose={close}
          button={
            <Tooltip label="Font family">
              <button
                className="h-7 px-2 flex items-center gap-1 rounded transition-all text-[10px] font-mono"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                }
              >
                {FONT_FAMILIES.find((f) => f.value === editorState.currentFontFamily)?.label ??
                  "Font"}
                <ChevronDown className="w-3 h-3" />
              </button>
            </Tooltip>
          }
          popover={
            <Dropdown
              options={FONT_FAMILIES}
              onSelect={(v) =>
                v
                  ? editor.chain().focus().setFontFamily(v).run()
                  : editor.chain().focus().unsetFontFamily().run()
              }
              onClose={close}
            />
          }
        />

        <Sep />

        {/* ── Headings ── */}
        <ToolbarBtn
          icon={<Heading1 className="w-3.5 h-3.5" />}
          label="Heading 1"
          action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editorState.isHeading1}
        />
        <ToolbarBtn
          icon={<Heading2 className="w-3.5 h-3.5" />}
          label="Heading 2"
          action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editorState.isHeading2}
        />
        <ToolbarBtn
          icon={<Heading3 className="w-3.5 h-3.5" />}
          label="Heading 3"
          action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editorState.isHeading3}
        />
        <ToolbarBtn
          icon={<Heading4 className="w-3.5 h-3.5" />}
          label="Heading 4"
          action={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          isActive={editorState.isHeading4}
        />
        <ToolbarBtn
          icon={<Heading5 className="w-3.5 h-3.5" />}
          label="Heading 5"
          action={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          isActive={editorState.isHeading5}
        />
        <ToolbarBtn
          icon={<Heading6 className="w-3.5 h-3.5" />}
          label="Heading 6"
          action={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          isActive={editorState.isHeading6}
        />

        <Sep />

        {/* ── Alignment ── */}
        <ToolbarBtn
          icon={<AlignLeft className="w-3.5 h-3.5" />}
          label="Align left"
          action={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editorState.isAlignLeft}
        />
        <ToolbarBtn
          icon={<AlignCenter className="w-3.5 h-3.5" />}
          label="Align center"
          action={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editorState.isAlignCenter}
        />
        <ToolbarBtn
          icon={<AlignRight className="w-3.5 h-3.5" />}
          label="Align right"
          action={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editorState.isAlignRight}
        />
        <ToolbarBtn
          icon={<AlignJustify className="w-3.5 h-3.5" />}
          label="Justify"
          action={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editorState.isAlignJustify}
        />

        <Sep />

        {/* ── Blocks ── */}
        <ToolbarBtn
          icon={<Pilcrow className="w-3.5 h-3.5" />}
          label="Paragraph"
          action={() => editor.chain().focus().setParagraph().run()}
          isActive={editorState.isParagraph}
        />
        <ToolbarBtn
          icon={<List className="w-3.5 h-3.5" />}
          label="Bullet list"
          action={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editorState.isBulletList}
        />
        <ToolbarBtn
          icon={<ListOrdered className="w-3.5 h-3.5" />}
          label="Ordered list"
          action={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editorState.isOrderedList}
        />
        <ToolbarBtn
          icon={<CodeSquare className="w-3.5 h-3.5" />}
          label="Code block"
          action={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editorState.isCodeBlock}
        />
        <ToolbarBtn
          icon={<TextQuote className="w-3.5 h-3.5" />}
          label="Blockquote"
          action={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editorState.isBlockquote}
        />
        <ToolbarBtn
          icon={<Minus className="w-3.5 h-3.5" />}
          label="Divider"
          action={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <ToolbarBtn
          icon={<WrapText className="w-3.5 h-3.5" />}
          label="Hard break"
          action={() => editor.chain().focus().setHardBreak().run()}
        />

        <Sep />

        {/* ── Link ── */}
        <PopoverTrigger
          id="link"
          openPopover={openPopover}
          onToggle={() => toggle("link")}
          onClose={close}
          button={
            <Tooltip label="Insert link">
              <button
                className="w-7 h-7 flex items-center justify-center rounded transition-all"
                style={{
                  color: editorState.isLink ? "#ffffff" : "var(--text-secondary)",
                  backgroundColor: editorState.isLink ? "var(--primary)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!editorState.isLink)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
                }}
                onMouseLeave={(e) => {
                  if (!editorState.isLink)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Link className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          }
          popover={
            <LinkPopover
              current={editorState.currentLinkHref}
              onSet={(url) => editor.chain().focus().setLink({ href: url, target: "_blank" }).run()}
              onRemove={() => editor.chain().focus().unsetLink().run()}
              onClose={close}
            />
          }
        />
        {editorState.isLink && (
          <ToolbarBtn
            icon={<Link2Off className="w-3.5 h-3.5" />}
            label="Remove link"
            action={() => editor.chain().focus().unsetLink().run()}
          />
        )}

        {/* ── Image ── */}
        <PopoverTrigger
          id="image"
          openPopover={openPopover}
          onToggle={() => toggle("image")}
          onClose={close}
          button={
            <Tooltip label="Insert image">
              <button
                className="w-7 h-7 flex items-center justify-center rounded transition-all"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                }
              >
                <Image className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          }
          popover={
            <ImagePopover
              onInsert={(src, alt) => editor.chain().focus().setImage({ src, alt }).run()}
              onClose={close}
            />
          }
        />

        {/* ── Table ── */}
        <PopoverTrigger
          id="table"
          openPopover={openPopover}
          onToggle={() => {
            if (!editorState.isTable) toggle("table");
          }}
          onClose={close}
          button={
            <Tooltip label="Insert table">
              <button
                className="w-7 h-7 flex items-center justify-center rounded transition-all"
                style={{
                  color: editorState.isTable ? "#ffffff" : "var(--text-secondary)",
                  backgroundColor: editorState.isTable ? "var(--primary)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!editorState.isTable)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
                }}
                onMouseLeave={(e) => {
                  if (!editorState.isTable)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Table className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          }
          popover={
            <TablePopover
              onInsert={(rows, cols) =>
                editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
              }
              onClose={close}
            />
          }
        />

        {/* ── Table controls ── */}
        {editorState.isTable && (
          <>
            <Sep />
            <TableBtn
              label="+Col←"
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            />
            <TableBtn label="+Col→" onClick={() => editor.chain().focus().addColumnAfter().run()} />
            <TableBtn label="+Row↑" onClick={() => editor.chain().focus().addRowBefore().run()} />
            <TableBtn label="+Row↓" onClick={() => editor.chain().focus().addRowAfter().run()} />
            <TableBtn
              label="−Col"
              onClick={() => editor.chain().focus().deleteColumn().run()}
              danger
            />
            <TableBtn
              label="−Row"
              onClick={() => editor.chain().focus().deleteRow().run()}
              danger
            />
            <TableBtn
              label="−Table"
              onClick={() => editor.chain().focus().deleteTable().run()}
              danger
            />
          </>
        )}

        <Sep />

        {/* ── Clear ── */}
        <ToolbarBtn
          icon={<RemoveFormatting className="w-3.5 h-3.5" />}
          label="Clear marks"
          action={() => editor.chain().focus().unsetAllMarks().run()}
        />
        <ToolbarBtn
          icon={<Trash2 className="w-3.5 h-3.5" />}
          label="Clear nodes"
          action={() => editor.chain().focus().clearNodes().run()}
        />

        <Sep />

        {/* ── History ── */}
        <ToolbarBtn
          icon={<Undo2 className="w-3.5 h-3.5" />}
          label="Undo"
          action={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        />
        <ToolbarBtn
          icon={<Redo2 className="w-3.5 h-3.5" />}
          label="Redo"
          action={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        />
      </div>
    </div>
  );
};
