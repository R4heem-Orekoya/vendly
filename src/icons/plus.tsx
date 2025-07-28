import React from "react";

export function PlusIcon({ width = 24, height = 24, ...props }: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 12h6m0 0h6m-6 0v6m0-6V6"
         />
      </svg>
   );
}