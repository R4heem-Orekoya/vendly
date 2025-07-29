"use node";

import { action } from "./_generated/server";
import { render, pretty } from "@react-email/render";
import {
   Html,
   Head,
   Preview,
   Body,
   Container,
   Text,
   Heading,
   Button,
} from "@react-email/components";
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
   testMode: false,
});

export const sendEmail = action({
   args: {
      email: v.string(),
   },
   handler: async (ctx, args) => {
      const html = await pretty(
         await render(
            <Html>
               <Head />
               <Preview>Welcome to Vendly – You're on the waitlist!</Preview>
               <Body
                  style={{
                     backgroundColor: "#f9f9f9",
                     padding: "40px 0",
                     fontFamily: "Arial, sans-serif",
                  }}
               >
                  <Container
                     style={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        padding: "32px",
                        width: "100%",
                        maxWidth: "520px",
                        margin: "0 auto",
                        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                     }}
                  >
                     <Heading
                        style={{
                           fontSize: "24px",
                           marginBottom: "20px",
                           color: "#111",
                        }}
                     >
                        Welcome to Vendly 👋
                     </Heading>

                     <Text
                        style={{
                           fontSize: "16px",
                           lineHeight: "1.6",
                           margin: "0 0 16px",
                           color: "#333",
                        }}
                     >
                        Hey there,
                     </Text>

                     <Text
                        style={{
                           fontSize: "16px",
                           lineHeight: "1.6",
                           margin: "0 0 16px",
                           color: "#333",
                        }}
                     >
                        You’ve successfully joined the waitlist for Vendly, the
                        easiest way to set up and sell products online, fast.
                     </Text>

                     <Text
                        style={{
                           fontSize: "16px",
                           lineHeight: "1.6",
                           margin: "0 0 16px",
                           color: "#333",
                        }}
                     >
                        We’re working hard to get things ready for you. You’ll
                        be the first to know when we launch.
                     </Text>

                     <Button
                        style={{
                           backgroundColor: "#2b7fff",
                           color: "#fff",
                           fontSize: "16px",
                           padding: "10px 20px",
                           borderRadius: "8px",
                           textDecoration: "none",
                           display: "inline-block",
                           marginTop: "24px",
                        }}
                        href="https://vendlyhq.app"
                     >
                        Visit Website
                     </Button>

                     <Text
                        style={{
                           marginBottom: "20px",
                           fontSize: "12px",
                           color: "#666",
                        }}
                     >
                        If you have questions, just reply to this email, we’re
                        real people and happy to chat.
                     </Text>
                  </Container>
               </Body>
            </Html>
         )
      );

      await resend.sendEmail(ctx, {
         from: "hello@vendlyhq.app",
         to: args.email,
         replyTo: ["hello@vendlyhq.app"],
         subject: "Welcome to Vendly",
         html,
      });
   },
});
