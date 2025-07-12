import {
   BankIcon,
   CalculatorIcon,
   ConnectedIcon,
   DashboardIcon,
   DeliveryIcon,
   DeveloperIcon,
   DiscountIcon,
   GlobeIcon,
   HangerIconDuo,
   InformationIcon,
   NotSureIconDuo,
   OrderIcon,
   PlugIconDuo,
   ProductsIcon,
   SettingsIcon,
   SiteConfigIcon,
   TaxIcon,
   UsersIcon,
   WalletCardIcon,
} from "@/icons";

export const dashboardLinks = [
   {
      label: "GENERAL",
      items: [
         {
            title: "Dashboard",
            icon: <DashboardIcon />,
            href: "/dashboard",
         },
         {
            title: "Products",
            icon: <ProductsIcon />,
            href: "/dashboard/products",
         },
         {
            title: "Orders",
            icon: <OrderIcon />,
            href: "/dashboard/orders",
         },
         {
            title: "Customers",
            icon: <UsersIcon />,
            href: "/dashboard/customers",
         },
         {
            title: "Discounts",
            icon: <DiscountIcon />,
            href: "/dashboard/discounts",
         },
         {
            title: "Expenses",
            icon: <CalculatorIcon />,
            href: "/dashboard/expenses",
         },
         {
            title: "Connected Apps",
            icon: <ConnectedIcon />,
            href: "/dashboard/connected-apps",
         },
      ],
   },
   {
      label: "STORE",
      items: [
         {
            title: "Store Information",
            icon: <InformationIcon />,
            href: "/dashboard/store-info",
         },
         {
            title: "Payment Methods",
            icon: <WalletCardIcon />,
            href: "/dashboard/payment-methods",
         },
         {
            title: "Shipping Methods",
            icon: <DeliveryIcon />,
            href: "/dashboard/shipping-methods",
         },
         {
            title: "Taxes",
            icon: <TaxIcon />,
            href: "/dashboard/taxes",
         },
         {
            title: "Store Settings",
            icon: <SettingsIcon />,
            href: "/dashboard/store-settings",
         },
         {
            title: "Site Configuration",
            icon: <SiteConfigIcon />,
            href: "/dashboard/site-config",
         },
         {
            title: "Domain Settings",
            icon: <GlobeIcon />,
            href: "/dashboard/domain-settings",
         },
         {
            title: "Bank Details",
            icon: <BankIcon />,
            href: "/dashboard/bank-details",
         },
         {
            title: "Developers",
            icon: <DeveloperIcon />,
            href: "/dashboard/developers",
         },
      ],
   },
];

export const storeTypes = [
   {
      title: "Fashion",
      value: "fashion",
      icon: <HangerIconDuo />,
   },
   {
      title: "Beauty & Personal Care",
      value: "beauty&personal-care",
      icon: <HangerIconDuo />,
   },
   {
      title: "Electronics",
      value: "electronics",
      icon: <PlugIconDuo />,
   },
   {
      title: "Gadgets",
      value: "gadgets",
      icon: <PlugIconDuo />,
   },
   {
      title: "Health & Wellness",
      value: "health&Wellness",
      icon: <PlugIconDuo />,
   },
   {
      title: "Food & Beverages",
      value: "food&beverages",
      icon: <PlugIconDuo />,
   },
   {
      title: "Not Sure",
      value: "not-sure",
      icon: <NotSureIconDuo />,
   },
] as const;

export type StoreType = (typeof storeTypes)[number]["value"];

export const currencies = [
   {
      label: "Nigerian Naira",
      value: "NGN",
   },
] as const;

export type CurrencyType = (typeof currencies)[number]["value"];
