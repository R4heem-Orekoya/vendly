import { defineApp } from "convex/server";
import actionRetrier from "@convex-dev/action-retrier/convex.config";
import resend from "@convex-dev/resend/convex.config";

const app = defineApp();
app.use(actionRetrier);
app.use(resend);
export default app;
