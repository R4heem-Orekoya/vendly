import { Button, buttonVariants } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ExportIconDuo, PlusIcon } from '@/icons'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Page() {
   return (
      <>
         <header className="flex h-15 w-full items-center justify-between border-b p-4">
            <div className="flex items-center gap-2 text-xs">
               <SidebarTrigger />
               <ChevronRight className="text-muted-foreground size-3" />
               <span className="bg-secondary rounded px-2 py-1">Products</span>
            </div>
               
            
            <div className='flex items-center gap-4'>
               <Button size="sm" variant="secondary">
                  <ExportIconDuo />
                  Export
               </Button>
               <Link href="/dashboard/products/create" className={buttonVariants({
                  size: "sm"
               })}>
                  <PlusIcon />
                  Add New Product
               </Link>
            </div>
         </header>
      </>
   )
}
