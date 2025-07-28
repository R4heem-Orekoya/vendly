'use client'

import { useEditor, EditorContent, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'

interface RichTextEditorProps {
   content: JSONContent | undefined;
   onChange: (content: JSONContent) => void;
}

export default function Tiptap({ content, onChange }: RichTextEditorProps) {
   const editor = useEditor({
      extensions: [
         StarterKit.configure({
            bulletList: {
               HTMLAttributes: {
                  class: "list-disc ml-3",
               },
            },
            orderedList: {
               HTMLAttributes: {
                  class: "list-decimal ml-3",
               },
            },
         }),
         Highlight,
         Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
         }),
         Link.configure({
            openOnClick: false,
            enableClickSelection: true,
            autolink: false,
            HTMLAttributes: {
               rel: 'noopener noreferrer',
               target: "_blank",
            },
            defaultProtocol: 'https',
            protocols: ['http', 'https', 'mailto'],
            isAllowedUri: (url, ctx) => {
               try {
                  const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                  if (!ctx.defaultValidate(parsedUrl.href)) {
                     return false
                  }

                  const disallowedProtocols = ['ftp', 'file', 'mailto']
                  const protocol = parsedUrl.protocol.replace(':', '')

                  if (disallowedProtocols.includes(protocol)) {
                     return false
                  }

                  const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                  if (!allowedProtocols.includes(protocol)) {
                     return false
                  }

                  const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                  const domain = parsedUrl.hostname

                  if (disallowedDomains.includes(domain)) {
                     return false
                  }

                  return true
               } catch {
                  return false
               }
            },
            shouldAutoLink: url => {
               try {
                  const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                  const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                  const domain = parsedUrl.hostname

                  return !disallowedDomains.includes(domain)
               } catch {
                  return false
               }
            },
         })
      ],
      content,
      editorProps: {
         attributes: {
            class: "max-w-full min-h-32 sm:min-h-20 rounded-b-lg focus-visible:border-ring focus-visible:ring-ring/50 text-sm shadow-xs outline-none focus-visible:ring-[3px] px-3 py-2"
         },
         handleClickOn(view, pos, node, nodePos, event) {
            const target = event.target as HTMLElement

            if (target.tagName === 'A') {
               event.preventDefault()
               return true
            }

            return false
         },
      },
      onUpdate: ({ editor }) => {
         onChange(editor.getJSON());
      },
      immediatelyRender: false
   })

   if (!editor) return null

   return (
      <div className='max-w-full border rounded-lg'>
         <MenuBar editor={editor} />
         <EditorContent editor={editor} />
      </div>
   )
}