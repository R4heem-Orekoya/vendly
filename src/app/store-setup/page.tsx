import CreateStoreForm from "@/components/store/create-store-form";
import Image from "next/image";
import Illustraction from "~/public/Brazuca - Sitting.svg";
import AppLogo from "~/public/logo.svg";

export default function Page() {
   return (
      <main className="grid lg:grid-cols-7">
         <div className="col-span-3 flex h-screen flex-col justify-between overflow-y-hidden bg-gradient-to-br from-white via-blue-100/50 to-white p-12 max-lg:hidden">
            <div>
               <div className="flex items-center gap-2">
                  <div className="relative size-10">
                     <Image
                        src={AppLogo}
                        alt="app logo"
                        className="h-full w-full object-cover"
                     />
                  </div>
                  <p className="text-xl font-semibold tracking-tight">Vendly</p>
               </div>

               <h4 className="mt-6 text-2xl font-semibold">Welcome to Vendly!</h4>

               <div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
                  <p>
                     Create and manage your store with ease. Vendly helps you reach
                     customers, track orders, and grow your business without the usual
                     tech headaches.
                  </p>
                  <p>
                     Whether you're selling clothes, gadgets, or digital products, our
                     platform is designed to scale with your goals.
                  </p>
                  <p>
                     Start with a free{" "}
                     <span className="text-primary font-medium">vendly.com</span>{" "}
                     domain and upgrade anytime to your custom domain.
                  </p>
               </div>
            </div>

            <div className="mx-auto mt-10 size-72">
               <Image
                  src={Illustraction}
                  alt="Illustration"
                  className="h-auto w-full object-contain"
               />
            </div>
         </div>

         <CreateStoreForm />
      </main>
   );
}
