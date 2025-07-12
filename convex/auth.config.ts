export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ],
  auth: {
    provider: "clerk",
    clerk: {
      jwtTemplate: "convex",
    },
  },
};
