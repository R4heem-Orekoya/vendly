"use client"

import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Units } from '@/lib/consts'
import { Controller, useFormContext } from 'react-hook-form'
import type { ProductSchemaType } from '@/validators/product'
import { NumberInput } from '../ui/number-input'

export default function ProductInventory() {
   const { control, formState: { errors } } = useFormContext<ProductSchemaType>();

   return (
      <div className='rounded-lg border p-4 space-y-4'>
         <h2 className='font-medium'>
            Inventory
         </h2>

         <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='grid gap-1'>
               <Label htmlFor="stock-quantity" className='text-xs text-muted-foreground'>
                  Stock Quantity <span className='text-destructive'>*</span>
               </Label>
               <Controller
                  name="stockQuantity"
                  control={control}
                  render={({ field }) => (
                     <NumberInput
                        id="stock-quantity"
                        value={field.value}
                        onChange={field.onChange}
                        min={0}
                        placeholder='Enter stock quantity'
                        className='placeholder:text-xs text-xs'
                     />
                  )}
               />
               {errors.stockQuantity && <p className='text-xs text-destructive'>{errors.stockQuantity.message}</p>}
            </div>

            <div className='grid gap-1'>
               <Label htmlFor='unit' className='text-xs text-muted-foreground'>
                  Unit <span className='text-destructive'>*</span>
               </Label>
               <Controller
                  name="stockUnit"
                  control={control}
                  defaultValue='pcs'
                  render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className='w-full text-xs'>
                           <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent>
                           {Units.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  )}
               />
               {errors.stockUnit && <p className='text-xs text-destructive'>{errors.stockUnit.message}</p>}
            </div>
         </div>
      </div>
   )
};
