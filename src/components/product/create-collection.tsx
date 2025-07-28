"use client"

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Spinner } from "@/icons"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useState } from "react"
import CreateCollectionUploadDropzone from "./create-collection-upload-dropzone"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { collectionSchema, type CollectionSchemaType } from "@/validators/product"
import { useUploadThing } from "@/lib/uploadthing"
import { useMutation } from "convex/react"
import { api } from "~/convex/_generated/api"
import { toast } from "sonner"

interface CreateCollectionProps {
   triggerComponent: () => React.JSX.Element
}

export default function CreateCollection({ triggerComponent }: CreateCollectionProps) {
   const [isOpen, setIsOpen] = useState(false)
   const [selectedFile, setSelectedFile] = useState<File | null>(null)

   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CollectionSchemaType>({
      resolver: zodResolver(collectionSchema)
   })

   const { startUpload } = useUploadThing("collectionImageUploader")

   const TriggerComponent = triggerComponent()

   const createCollection = useMutation(api.collections.create)

   async function onSubmit(data: CollectionSchemaType) {
      try {
         const res = await createCollection({ ...data })

         if (res.error) {
            toast.error(res.message)
            return
         }

         if (selectedFile && res.collectionId) {
            void startUpload([selectedFile], { collectionId: res.collectionId })
         }
         
         toast.success("Collection created successfully!")
         reset({
            name: "",
            description: ""
         })
         setSelectedFile(null)
         setIsOpen(false)
      } catch (error) {
         toast.error("Something went wrong!")
      }
   }

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen} modal>
         <SheetTrigger asChild>
            {TriggerComponent}
         </SheetTrigger>
         <SheetContent className="sm:max-w-md w-full">
            <SheetHeader className="py-6">
               <SheetTitle className="text-xl">Create Product Collection</SheetTitle>
               <SheetDescription></SheetDescription>
            </SheetHeader>

            <div className="p-4">
               <CreateCollectionUploadDropzone
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  isFormSubmitting={isSubmitting}
               />

               <div className="grid gap-6 mt-6">
                  <div className="grid gap-2">
                     <Label htmlFor="collectionName" className="text-muted-foreground">
                        Collection Name
                        <span className="text-destructive">*</span>
                     </Label>
                     <Input type="text" id="collectionName" {...register("name")} aria-invalid={!!errors.name} placeholder="Enter collection name" />
                     {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="collectionDescription" className="text-muted-foreground">
                        Collection Description
                     </Label>
                     <Textarea id="collectionDescription" {...register("description")} aria-invalid={!!errors.description} placeholder="Enter collection description" className="max-h-28" />
                     {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                  </div>
               </div>
            </div>

            <SheetFooter>
               <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
               >
                  Save
                  {isSubmitting && <Spinner />}
               </Button>
               <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
               </SheetClose>
            </SheetFooter>
         </SheetContent>
      </Sheet >
   )
}
