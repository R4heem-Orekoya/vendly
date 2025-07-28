import React, { type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PriceInputProps = Omit<
   ComponentProps<typeof Input>,
   "type" | "onChange" | "value"
> & {
   onChange: (value: number | null) => void;
   value: undefined | null | number;
   currencyCode: string;
};

export function PriceInput({
   onChange,
   value,
   currencyCode,
   className,
   ...props
}: PriceInputProps) {
   return (
      <div className="relative">
         <Input
            {...props}
            onChange={e => {
               const number = e.target.valueAsNumber;
               onChange(isNaN(number) ? null : number);
            }}
            value={value ?? ""}
            type="number"
            className={cn("ps-8", className)}
         />
         <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
            {currencyCode}
         </span>
      </div>
   );
}
