"use client";

import { createContext, useContext, useState } from "react";

type ProductFormContextType = {
   selectedMedia: File[] | null;
   setSelectedMedia: React.Dispatch<React.SetStateAction<File[] | null>>;
   selectedProductFiles: File[] | null;
   setSelectedProductFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
   removeSelectedMedia: (file: string) => void;
   removeSelectedProductFile: (file: string) => void;
};

const ProductFormContext = createContext<ProductFormContextType | undefined>(
   undefined
);

export function ProductFormProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [selectedMedia, setSelectedMedia] = useState<File[] | null>(null);
   const [selectedProductFiles, setSelectedProductFiles] = useState<
      File[] | null
   >(null);
   
   function removeSelectedMedia(file: File["name"]) {
      setSelectedMedia(prev => prev && prev.filter(f => f.name !== file))
   }
   
   function removeSelectedProductFile(file: File["name"]) {
      setSelectedProductFiles(prev => prev && prev.filter(f => f.name !== file))
   }

   return (
      <ProductFormContext.Provider
         value={{
            selectedMedia,
            setSelectedMedia,
            removeSelectedMedia,
            selectedProductFiles,
            setSelectedProductFiles,
            removeSelectedProductFile
         }}
      >
         {children}
      </ProductFormContext.Provider>
   );
}

export function useProductFormContext() {
   const context = useContext(ProductFormContext);
   if (!context) {
      throw new Error(
         "useProductFormContext must be used within a ProductFormProvider"
      );
   }
   return context;
}
