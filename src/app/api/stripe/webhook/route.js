import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // raw body
  console.log("run to web hook", req, process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return new Response("Webhook Error" + err, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment success:", session);
    // xử lý order, lưu DB, gửi email
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
