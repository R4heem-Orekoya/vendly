import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useFormContext } from 'react-hook-form'
import type { ProductSchemaType } from "@/validators/product"

export default function SearchEngineListing() {
   const { register, formState: { errors } } = useFormContext<ProductSchemaType>()

   return (
      <div className='rounded-lg border p-4 space-y-4'>
         <div className='space-y-1'>
            <h2 className='font-medium'>
               Search engine listing
            </h2>
            <p className='text-xs text-muted-foreground'>
               Add a title and description to see how this product might appear in a search engine listing
            </p>
         </div>

         <div className='grid gap-1'>
            <Label htmlFor="page-title" className='text-xs text-muted-foreground'>
               Page Title
            </Label>
            <Input {...register("pageTitle")} id="page-title" type="text" placeholder='Enter page title' className='placeholder:text-xs text-xs' />
            {errors.pageTitle && <p className='text-destructive text-xs'>{errors.pageTitle.message}</p>}
         </div>

         <div className='grid gap-1'>
            <Label htmlFor="page-description" className='text-xs text-muted-foreground'>
               Page Description
            </Label>
            <Textarea {...register("pageDescription")} id="page-description" className='placeholder:text-xs text-xs max-h-32' />
            {errors.pageDescription && <p className='text-destructive text-xs'>{errors.pageDescription.message}</p>}
         </div>
      </div>
   )
};
