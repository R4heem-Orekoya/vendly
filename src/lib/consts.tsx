import { BankIconDuo, CalculatorIconDuo, ConnectedIconDuo, DashboardIconDuo, DeliveryIconDuo, DeveloperIconDuo, DiscountIconDuo, GlobeIconDuo, InformationIconDuo, OrderIconDuo, ProductsIconDuo, SettingsIconDuo, SiteConfigIconDuo, TaxIconDuo, UsersIconDuo, WalletCardIconDuo } from "@/icons"

export const dashboardLinks = [
   {
      label: "GENERAL",
      items: [
         {
            title: "Dashboard",
            icon: <DashboardIconDuo />,
            href: "/dashboard"
         },
         {
            title: "Products",
            icon: <ProductsIconDuo />,
            href: "/dashboard/products"
         },
         {
            title: "Orders",
            icon: <OrderIconDuo />,
            href: "/dashboard/orders"
         },
         {
            title: "Customers",
            icon: <UsersIconDuo />,
            href: "/dashboard/customers"
         },
         {
            title: "Discounts",
            icon: <DiscountIconDuo />,
            href: "/dashboard/discounts"
         },
         {
            title: "Expenses",
            icon: <CalculatorIconDuo />,
            href: "/dashboard/expenses"
         },
         {
            title: "Connected Apps",
            icon: <ConnectedIconDuo />,
            href: "/dashboard/connected-apps"
         },
      ]
   },
   {
      label: "STORE",
      items: [
         {
            title: "Store Information",
            icon: <InformationIconDuo />,
            href: "/store-info"
         },
         {
            title: "Payment Methods",
            icon: <WalletCardIconDuo />,
            href: "/payment-methods"
         },
         {
            title: "Shipping Methods",
            icon: <DeliveryIconDuo />,
            href: "/shipping-methods"
         },
         {
            title: "Taxes",
            icon: <TaxIconDuo />,
            href: "/taxes"
         },
         {
            title: "Store Settings",
            icon: <SettingsIconDuo />,
            href: "/store-settings"
         },
         {
            title: "Site Configuration",
            icon: <SiteConfigIconDuo />,
            href: "/site-config"
         },
         {
            title: "Domain Settings",
            icon: <GlobeIconDuo />,
            href: "/domain-settings"
         },
         {
            title: "Bank Details",
            icon: <BankIconDuo />,
            href: "/bank-details"
         },
         {
            title: "Developers",
            icon: <DeveloperIconDuo />,
            href: "/developers"
         },
      ]
   }
]