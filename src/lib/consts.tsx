import { Cable, Calculator, CirclePercent, GlobeLock, HandCoins, Info, Landmark, LayoutDashboard, Logs, MonitorCog, Settings, ShoppingBasket, TruckElectric, Users, WalletCards, Workflow } from "lucide-react"

export const dashboardLinks = [
   {
      label: "GENERAL",
      items: [
         {
            title: "Dashboard",
            icon: <LayoutDashboard />,
            href: "/dashboard"
         },
         {
            title: "Products",
            icon: <ShoppingBasket />,
            href: "/dashboard/products"
         },
         {
            title: "Orders",
            icon: <Logs />,
            href: "/dashboard/orders"
         },
         {
            title: "Customers",
            icon: <Users />,
            href: "/dashboard/customers"
         },
         {
            title: "Discounts",
            icon: <CirclePercent />,
            href: "/dashboard/discounts"
         },
         {
            title: "Expenses",
            icon: <Calculator />,
            href: "/dashboard/expenses"
         },
         {
            title: "Connected Apps",
            icon: <Workflow />,
            href: "/dashboard/connected-apps"
         },
      ]
   },
   {
      label: "STORE",
      items: [
         {
            title: "Store Information",
            icon: <Info />,
            href: "/store-info"
         },
         {
            title: "Payment Methods",
            icon: <WalletCards />,
            href: "/payment-methods"
         },
         {
            title: "Shipping Methods",
            icon: <TruckElectric />,
            href: "/shipping-methods"
         },
         {
            title: "Taxes",
            icon: <HandCoins />,
            href: "/taxes"
         },
         {
            title: "Store Settings",
            icon: <Settings />,
            href: "/store-settings"
         },
         {
            title: "Site Configuration",
            icon: <MonitorCog />,
            href: "/site-config"
         },
         {
            title: "Domain Settings",
            icon: <GlobeLock />,
            href: "/domain-settings"
         },
         {
            title: "Bank Details",
            icon: <Landmark />,
            href: "/bank-Details"
         },
         {
            title: "Developers",
            icon: <Cable />,
            href: "/developers"
         },
      ]
   }
]