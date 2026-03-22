import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const payloadString = await request.text();
        const headerPayload = request.headers;

        try {
            // In production, you would use svix to verify the payload here:
            // const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
            // const evt = wh.verify(payloadString, headerPayload) as WebhookEvent;

            const evt = JSON.parse(payloadString);

            if (evt.type === "user.created" || evt.type === "user.updated") {
                const { id, first_name, last_name, email_addresses, public_metadata } = evt.data;

                await ctx.runMutation(internal.users.syncUserInternal, {
                    clerkId: id,
                    name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
                    email: email_addresses[0]?.email_address || "",
                    role: (public_metadata?.role as any) || "STUDENT",
                });
            }

            return new Response("Webhook processed", { status: 200 });
        } catch (err) {
            console.error("Error processing Clerk webhook", err);
            return new Response("Error processing webhook", { status: 400 });
        }
    }),
});

export default http;
