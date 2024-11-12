import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount, currency } = req.body;

      // Ensure the required fields are provided
      if (!amount || !currency) {
        return res.status(400).json({ message: 'Missing required payment information' });
      }

      // Create a PaymentIntent with the specified amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe accepts amounts in cents, so multiply by 100
        currency: currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Send the client_secret to the frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
