"use client"

import { productTypes } from "@/lib/consts"
import Tiptap from "../tip-tap"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select"
import CreateCollection from "./create-collection"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import type { ProductSchemaType } from "@/validators/product"
import { useState } from "react"
import debounce from "lodash.debounce"
import type { JSONContent } from "@tiptap/react"
import { useStore } from "@/hooks/use-store"
import { useCollections } from "@/hooks/use-collection"
import UploadDropZone from "./create-product-dropzone"

interface GeneralInformtaionProps { }

export default function GeneralInformtaion({ }: GeneralInformtaionProps) {
   const store = useStore()
   const collections = useCollections(store?._id)

   const { register, setValue, control, formState: { errors } } = useFormContext<ProductSchemaType>()
   const [description, setDescription] = useState<JSONContent | undefined>();

   const onDescriptionChange = debounce((content: JSONContent) => {
      setValue("description", content)
      setDescription(content);
   }, 1000);


   return (
      <div className='rounded-lg border p-4 space-y-4'>
         <h2 className='font-medium'>
            General Information
         </h2>

         <div className='grid gap-1'>
            <Label htmlFor="name" className='text-xs text-muted-foreground'>
               Product Name <span className='text-destructive'>*</span>
            </Label>
            <Input id="name" {...register("name")} aria-invalid={!!errors.name} type="text" placeholder='Enter product name' className='placeholder:text-xs text-xs' />
            {errors.name && <p className='text-xs text-destructive'>{errors.name.message}</p>}
         </div>

         <div className='max-w-full grid gap-1'>
            <Label className='text-xs text-muted-foreground'>Product Description</Label>
            <Tiptap content={description} onChange={onDescriptionChange} />
         </div>
         
         <div className="grid gap-1">
            <Label className='text-xs text-muted-foreground'>Product Media</Label>
            <UploadDropZone />
         </div>

         <div className='grid gap-1'>
            <Label htmlFor="product-type" className='text-xs text-muted-foreground'>
               Product Type
            </Label>

            <Controller
               name="type"
               control={control}
               defaultValue={productTypes[0].value}
               render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <SelectTrigger className='w-full text-xs'>
                        <SelectValue placeholder="Select product type" />
                     </SelectTrigger>
                     <SelectContent>
                        {productTypes.map((type) => (
                           <SelectItem className='text-xs' value={type.value} key={type.value}>{type.label}</SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               )}
            />
            {errors.type && <p className='text-xs text-destructive'>{errors.type.message}</p>}
         </div>

         <div className='grid gap-1'>
            <Label htmlFor='collection' className='text-xs text-muted-foreground'>
               Collection
            </Label>

            <Controller
               name="collections"
               control={control}
               defaultValue={[]}
               render={({ field }) => (
                  <MultiSelect
                     values={field.value}
                     onValuesChange={field.onChange}
                  >
                     <MultiSelectTrigger disabled={!collections[0]} className="w-full text-xs">
                        <MultiSelectValue placeholder="Select Collections..." />
                     </MultiSelectTrigger>
                     <MultiSelectContent search={false}>
                        <MultiSelectGroup>
                           {collections.map((collection) => (
                              <MultiSelectItem key={collection._id} value={collection._id}>{collection.name}</MultiSelectItem>
                           ))}
                        </MultiSelectGroup>
                     </MultiSelectContent>
                  </MultiSelect>
               )}
            />

            <CreateCollection
               triggerComponent={() => (
                  <Button size="sm" variant="link" className='w-max h-[unset] text-xs mt-1 has-[>svg]:px-0'>
                     Create Collection <Plus className='size-3' />
                  </Button>
               )}
            />
         </div>
      </div>
   )
}
