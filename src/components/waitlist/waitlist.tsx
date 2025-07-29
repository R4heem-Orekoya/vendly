import AppLogo from "../logo";
import { Badge } from "../ui/badge";
import Benefits from "./benefits";
import WaitlistForm from "./waitlist-form";

export default function Waitlist() {
   return (
      <main className="px-6">
         <section className="flex flex-col items-center py-12 md:py-16 lg:py-20">
            <AppLogo />

            <div className="flex flex-col items-center gap-4 max-w-2xl mt-16 md:mt-20">
               <Badge className="py-1 bg-primary/10 text-primary font-semibold rounded-lg">
                  Coming Soon!
               </Badge>
               <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-center text-balance font-semibold md:font-medium">
                  Simplify your storefront setup. Sell physical and digital
                  products with ease.
               </h1>
               <p className="text-muted-foreground text-center md:text-lg">
                  Be among the first to experience Vendly. Join the waitlist for
                  early access to the simplest way to sell digital and physical
                  products.
               </p>
            </div>

            <WaitlistForm />
            
            <Benefits />
         </section>
      </main>
   );
}
