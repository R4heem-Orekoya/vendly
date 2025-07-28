"use client";

import { useProductFormContext } from "@/context/product-form-context";
import { UploadIconDuo } from "@/icons";
import { formatBytes } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { FileArchive, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductFilesDropzone() {
   const maxSizeMB = 128;
   const maxSize = maxSizeMB * 1024 * 1024;
   const maxFiles = 1;

   const {
      setSelectedProductFiles,
      selectedProductFiles,
      removeSelectedProductFile,
   } = useProductFormContext();

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: onDrop,
      accept: {
         "application/zip": [".zip"],
      },
      multiple: true,
      maxSize,
      maxFiles,
   });

   function onDrop(selectedFiles: File[]) {
      setSelectedProductFiles(selectedFiles);
   }

   return (
      <>
         {selectedProductFiles && selectedProductFiles.length > 0 ? (
            <div className="space-y-2">
               {selectedProductFiles.map(file => (
                  <div
                     key={file.name}
                     className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                  >
                     <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                           <FileArchive className="size-5 text-muted-foreground" />
                        </div>
                        <div className="flex min-w-0 flex-col gap-0.5">
                           <p className="truncate text-[13px] font-medium">
                              {file.name}
                           </p>
                           <p className="text-muted-foreground text-xs">
                              {formatBytes(file.size)}
                           </p>
                        </div>
                     </div>

                     <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                        onClick={() => removeSelectedProductFile(file.name)}
                        aria-label="Remove file"
                     >
                        <XIcon
                           className="size-4 text-destructive"
                           aria-hidden="true"
                        />
                     </Button>
                  </div>
               ))}
            </div>
         ) : (
            <div
               {...getRootProps()}
               className="flex flex-col items-center justify-center w-full py-6 border border-dashed rounded-md bg-secondary text-muted-foreground text-sm cursor-pointer"
            >
               <input {...getInputProps()} className="hidden" />
               <UploadIconDuo />
               <p>
                  {isDragActive
                     ? "Drop the file here..."
                     : "Click or drag to upload image"}
               </p>
               <p className="text-xs">
                  {" "}
                  Max file size: 128MB. Only .zip files allowed.
               </p>
            </div>
         )}
      </>
   );
}
