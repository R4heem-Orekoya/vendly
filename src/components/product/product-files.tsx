import ProductFilesDropzone from "./product-files-dropzone";

export default function ProductFiles() {
   return (
      <div className="rounded-lg border p-4 space-y-4">
         <div className="space-y-1">
            <h2 className="font-medium">Product File</h2>
            <p className="text-xs text-muted-foreground">
               File that will be sent to buyer
            </p>
         </div>
         <ProductFilesDropzone />
      </div>
   );
}
