// DocumentEditor.tsx
'use client'

import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import { MenuBar } from './Menubar'

const DocumentEditor = ({
  content,
  onChange,
}: {
  content?: string
  onChange?: (html: string) => void
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      Placeholder.configure({ placeholder: 'Start writing...' }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(content ?? '')
  }, [editor, content])

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
  )
}

export default DocumentEditor