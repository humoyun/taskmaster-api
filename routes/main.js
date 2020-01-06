const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/", (req, res) => {
  res.render("index", {
    stripePublishKey: process.env.STRIPE_PUBLISH_KEY
  });
});

router.post("/charge", (req, res) => {
  // res.render("charge");
  console.log("******* Stripe Payment *******");

  const amount = 2400;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => {
      stripe.charges
        .create({
          amount,
          description: "web development ebook",
          currency: "usd",
          customer: customer.id
        })
        .then(charged => {
          res.render("success");
        });
    });
});

module.exports = router;
