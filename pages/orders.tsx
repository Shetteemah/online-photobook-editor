import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Order = {
  id: string;
  date: string;
  items: { name: string; price: number }[];
  status: string;
};

export default function OrderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>([
    {
      id: 'order123',
      date: '2024-10-01',
      items: [
        { name: 'Photo Book (Large)', price: 39.99 },
        { name: 'Calendar (Small)', price: 19.99 },
      ],
      status: 'Delivered',
    },
    {
      id: 'order124',
      date: '2024-09-15',
      items: [{ name: 'Photo Book (Medium)', price: 29.99 }],
      status: 'Shipped',
    },
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
    if (session) {
      setUserDetails({
        name: session.user?.name || '',
        email: session.user?.email || '',
      });
    }
  }, [session, status, router]);

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      {/* User Details */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={userDetails.email}
          className="border p-2 w-full rounded-md"
          disabled
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Save Changes
      </button>

      {/* Order History */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">Order History</h2>
        <ul className="mt-6">
          {orderHistory.map((order) => (
            <li key={order.id} className="border-b py-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Order #{order.id}</p>
                  <p className="text-sm">Date: {order.date}</p>
                  <ul className="mt-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.name} - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={`text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status}
                </p>
              </div>

              {/* Link to Track Order */}
              <p className="text-sm">
                <Link href={`/orders/${order.id}`} className="text-blue-500 hover:underline">
                  Track Order
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
