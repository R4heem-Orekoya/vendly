"use client";

import { useProductFormContext } from "@/context/product-form-context";
import { UploadIconDuo } from "@/icons";
import { useDropzone } from "@uploadthing/react";
import { Button } from "../ui/button";
import { Plus, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

export default function UploadDropZone() {
   const maxSizeMB = 4;
   const maxSize = maxSizeMB * 1024 * 1024;
   const maxFiles = 16;

   const { selectedMedia, setSelectedMedia, removeSelectedMedia } =
      useProductFormContext();

   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         setSelectedMedia(prev => {
            const existing = prev ?? [];

            const newFiles = acceptedFiles.filter(
               file => !existing.some(f => f.name === file.name)
            );

            const combined = [...existing, ...newFiles];

            return combined.slice(0, maxFiles);
         });
      },
      [setSelectedMedia, maxFiles]
   );

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: onDrop,
      accept: {
         "image/*": [".jpg", ".jpeg", ".png", ".webp"],
      },
      multiple: true,
      maxSize,
      maxFiles,
   });

   const previews = useMemo(
      () =>
         selectedMedia?.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
         })) ?? [],
      [selectedMedia]
   );

   return (
      <>
         {selectedMedia && selectedMedia?.length > 0 ? (
            <div className="flex w-full flex-col gap-3 bg-muted p-3 rounded-lg">
               <h3 className="truncate text-sm font-medium">
                  Selected Files ({selectedMedia.length})
               </h3>

               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {previews?.map(file => (
                     <div
                        key={file.name}
                        className="relative border aspect-square rounded-md bg-background"
                     >
                        <img
                           src={file.url}
                           alt={file.name}
                           className="size-full rounded-[inherit] object-cover"
                           loading="lazy"
                        />
                        <Button
                           onClick={() => removeSelectedMedia(file.name)}
                           type="button"
                           size="icon"
                           className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                           aria-label="Remove image"
                        >
                           <XIcon className="size-3.5" />
                        </Button>
                     </div>
                  ))}

                  {!(selectedMedia.length >= maxFiles) && (
                     <div
                        {...getRootProps()}
                        className="flex flex-col items-center justify-center gap-1 aspect-square border border-dashed rounded-lg bg-background cursor-pointer"
                     >
                        <input {...getInputProps()} className="hidden" />
                        <Plus className="size-12 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                           Add more
                        </p>
                     </div>
                  )}
               </div>
            </div>
         ) : (
            <div
               {...getRootProps()}
               className="flex items-center justify-center flex-col w-full py-8 bg-secondary text-muted-foreground text-sm rounded-lg border border-dashed cursor-pointer hover:bg-accent transition-all"
            >
               <input {...getInputProps()} className="hidden" />
               <UploadIconDuo />
               <p>
                  {isDragActive
                     ? "Drop the file here..."
                     : "Click or drag to upload image"}
               </p>
               <p className="text-xs">Max file size: 4MB</p>
            </div>
         )}
      </>
   );
}
