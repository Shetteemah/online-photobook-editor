import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [billingInfo, setBillingInfo] = useState({ name: '', email: '', address: '' });
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '' });
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet.
    }

    setIsProcessing(true);

    try {
      // Send a request to your backend to create a PaymentIntent
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartItems.reduce((total, item) => total + item.price, 0), // Total amount to charge
          currency: 'usd', // Adjust this according to your currency
        }),
      });

      const { clientSecret } = await res.json();

      // Confirm the payment using Stripe's API
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: billingInfo.name,
            email: billingInfo.email,
            address: {
              line1: billingInfo.address,
            },
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message || 'Payment failed');
        setIsProcessing(false);
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          setPaymentSuccess(true);
          clearCart();
          router.push('/order-confirmation');
        }
      }
    } catch (error) {
      setPaymentError('An error occurred while processing your payment');
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {step === 1 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Billing Information</h2>
          <input
            type="text"
            placeholder="Name"
            value={billingInfo.name}
            onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
            className="border p-2 w-full rounded-md mt-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={billingInfo.email}
            onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
            className="border p-2 w-full rounded-md mt-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={billingInfo.address}
            onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
            className="border p-2 w-full rounded-md mt-2"
          />
          <button onClick={handleNextStep} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md">
            Next: Shipping Information
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <input
            type="text"
            placeholder="Name"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            className="border p-2 w-full rounded-md mt-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="border p-2 w-full rounded-md mt-2"
          />
          <button onClick={handlePreviousStep} className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-md">
            Back
          </button>
          <button onClick={handleNextStep} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md ml-4">
            Next: Payment Information
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handlePlaceOrder} className="mt-6">
          <h2 className="text-xl font-semibold">Payment Information</h2>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md ml-4"
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      )}
    </div>
  );
}
