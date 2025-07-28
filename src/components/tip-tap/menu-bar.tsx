"use client"

import './styles.css'

import { type Editor } from "@tiptap/react"
import {
   Bold,
   Italic,
   Strikethrough,
   Highlighter,
   Heading1,
   Heading2,
   Heading3,
   Pilcrow,
   Heading6,
   Heading5,
   Heading4,
   ListOrdered,
   List,
   Link,
} from "lucide-react"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Toggle } from "../ui/toggle"
import { useCallback, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface MenuBarProps {
   editor: Editor | null
}

export default function MenuBar({ editor }: MenuBarProps) {
   const [linkValue, setLinkValue] = useState("")

   if (!editor) return null

   const Options = [
      {
         icon: <Heading1 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
         pressed: editor.isActive("heading", { level: 1 }),
      },
      {
         icon: <Heading2 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
         pressed: editor.isActive("heading", { level: 2 }),
      },
      {
         icon: <Heading3 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
         pressed: editor.isActive("heading", { level: 3 }),
      },
      {
         icon: <Heading4 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
         pressed: editor.isActive("heading", { level: 4 }),
      },
      {
         icon: <Heading5 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
         pressed: editor.isActive("heading", { level: 5 }),
      },
      {
         icon: <Heading6 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
         pressed: editor.isActive("heading", { level: 6 }),
      },
      {
         icon: <Pilcrow className="size-4" />,
         onClick: () => editor.chain().focus().setParagraph().run(),
         pressed: editor.isActive("paragraph"),
      },
      {
         icon: <Bold className="size-4" />,
         onClick: () => editor.chain().focus().toggleBold().run(),
         pressed: editor.isActive("bold"),
      },
      {
         icon: <Italic className="size-4" />,
         onClick: () => editor.chain().focus().toggleItalic().run(),
         pressed: editor.isActive("italic"),
      },
      {
         icon: <Strikethrough className="size-4" />,
         onClick: () => editor.chain().focus().toggleStrike().run(),
         pressed: editor.isActive("strike"),
      },
      {
         icon: <List className="size-4" />,
         onClick: () => editor.chain().focus().toggleBulletList().run(),
         pressed: editor.isActive("bulletList"),
      },
      {
         icon: <ListOrdered className="size-4" />,
         onClick: () => editor.chain().focus().toggleOrderedList().run(),
         pressed: editor.isActive("orderedList"),
      },
      {
         icon: <Highlighter className="size-4" />,
         onClick: () => editor.chain().focus().toggleHighlight({ color: "#2b7fff" }).run(),
         pressed: editor.isActive("highlight"),
      },
   ];

   const handleAddLink = useCallback((e: React.FormEvent) => {
      e.preventDefault()
      if (!linkValue) {
         editor.chain().focus().extendMarkRange("link").unsetLink().run()
         return
      }

      try {
         editor.chain().focus().extendMarkRange("link").setLink({ href: linkValue }).run()
         setLinkValue("")
      } catch (err: any) {
         alert(err.message)
      }
   }, [editor, linkValue])

   return (
      <div className="flex items-center border-b px-2 py-1 overflow-x-auto">
         <div className="flex items-center flex-wrap gap-1">
            {Options.map((option, index) => (
               <Toggle
                  key={index}
                  size="sm"
                  pressed={option.pressed}
                  onPressedChange={option.onClick}
                  className="shrink-0"
               >
                  {option.icon}
               </Toggle>
            ))}

            <Popover>
               <PopoverTrigger asChild>
                  <Toggle
                     size="sm"
                     className="shrink-0"
                     pressed={editor.isActive("link")}
                  >
                     <Link className='size-4' />
                  </Toggle>
               </PopoverTrigger>
               <PopoverContent align='end' className="max-w-80 rounded-lg p-2 mt-2">
                  <form onSubmit={handleAddLink} className='flex items-center gap-2'>
                     <Input
                        type='url'
                        value={linkValue}
                        onChange={(e) => setLinkValue(e.target.value)}
                        placeholder='e.g https://redoxx.vercel.app'
                        className='h-7 px-2 rounded-sm placeholder:text-xs text-xs md:text-xs'
                     />
                     <Button size="sm" className='h-7 text-xs font-normal'>Add</Button>
                  </form>
               </PopoverContent>
            </Popover>
         </div>
      </div>
   )
}
