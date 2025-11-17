import Stripe from "stripe";
import { addOrdertsService } from "../../../services/orderService";
export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });

  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      const userId = session.metadata?.userId;
      const items = JSON.parse(session.metadata?.cartItems || "[]");
      const shippingAddress = JSON.parse(session.metadata?.shippingAddress || "{}");

      const newOrder = {
        user: userId,
        reference: session.id,
        items,
        shippingAddress,
        paymentMethod: "stripe",
        paymentResult: {
          id: session.payment_intent,
          status: session.payment_status,
          update_time: new Date().toISOString(),
          email_address: session.customer_email ?? "",
        },
        itemsPrice: Number(session.amount_subtotal) / 100,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: Number(session.amount_total) / 100,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
        status: "processing",
      };
      await addOrdertsService(newOrder);
    } catch (error) {
      console.error("❌ Failed to save order:", error);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
