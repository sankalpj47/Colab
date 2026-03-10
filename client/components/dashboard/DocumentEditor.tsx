'use client'

import { TextStyleKit } from '@tiptap/extension-text-style'
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { MenuBar } from './Menubar'

const DocumentEditor = ({
  content,
  onChange,
}: {
  content?: string;
  onChange?: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  })

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(content ?? '')
  }, [editor, content])

  return (
    <>
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  )
}

export default DocumentEditor