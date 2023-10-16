const STRIPE_TEST_KEY = "";
const YOUR_DOMAIN = "http://localhost:5500/frontend";
// This is your test secret API key.
const stripe = require("stripe")(STRIPE_TEST_KEY);

const cors = require("cors");

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  console.log("Connecting with Stripe...");

  const session = await stripe.checkout.sessions.create({
    line_items: req.body,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("Running on port 4242"));
