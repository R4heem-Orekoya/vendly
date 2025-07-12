interface Props {
   params: Promise<{ subdomain: string }>;
}

export default async function Page({ params }: Props) {
   const { subdomain } = await params;

   return <div>{subdomain}</div>;
}
