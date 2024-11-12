import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

export default function CartPage() {
  const { cartItems, removeItemFromCart, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return <div className="p-6">Your cart is empty.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <ul className="mt-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b py-4">
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>{item.customizationDetails}</p>
              <p>Price: ${item.price}</p>
              <p>Photos: {item.photos.length} uploaded</p>
            </div>
            <button
              onClick={() => removeItemFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between">
        <button onClick={clearCart} className="bg-red-500 text-white px-6 py-2 rounded-md">
          Clear Cart
        </button>
        <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-2 rounded-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
