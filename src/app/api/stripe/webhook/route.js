import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // raw body để Stripe verify

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET, // webhook secret dùng để verify
    );
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Xử lý event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Payment success:", session);
    // xử lý order, lưu DB, gửi email,...
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
