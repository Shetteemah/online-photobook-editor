import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Order = {
  id: string;
  date: string;
  items: { name: string; price: number }[];
  status: string;
  trackingUpdates: { date: string; status: string }[];
};

export default function OrderTrackingPage() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch order data from API or database (example data below)
      setOrder({
        id: 'order123',
        date: '2024-10-01',
        items: [
          { name: 'Photo Book (Large)', price: 39.99 },
          { name: 'Calendar (Small)', price: 19.99 },
        ],
        status: 'Delivered',
        trackingUpdates: [
          { date: '2024-10-02', status: 'Processing' },
          { date: '2024-10-03', status: 'Shipped' },
          { date: '2024-10-05', status: 'Out for Delivery' },
          { date: '2024-10-06', status: 'Delivered' },
        ],
      });
    }
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Order #{order.id} - Tracking</h1>
      <p className="text-lg">Order Date: {order.date}</p>

      <ul className="mt-6">
        {order.trackingUpdates.map((update, index) => (
          <li key={index} className="border-b py-4">
            <div className="flex justify-between">
              <p className="text-sm">{update.date}</p>
              <p className={`text-sm font-semibold ${update.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                {update.status}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-12">Order Items</h2>

      <ul className="mt-4">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-4">
            <p>{item.name}</p>
            <p>${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
