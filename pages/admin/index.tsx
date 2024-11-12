type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
  
  const mockProducts: Product[] = [
    { id: 'product001', name: 'Photo Book (Large)', price: 39.99, stock: 50 },
    { id: 'product002', name: 'Calendar (Small)', price: 19.99, stock: 30 },
  ];
  
  export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [products, setProducts] = useState<Product[]>(mockProducts);
  
    useEffect(() => {
      if (status === 'loading') return;
      if (!session || session.user.role !== 'admin') {
        router.push('/auth/signin');
      }
    }, [session, status, router]);
  
    const handleStockChange = (productId: string, newStock: number) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, stock: newStock } : product
        )
      );
    };
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
  
        {/* Order Management Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Manage Orders</h2>
          {/* Order management table */}
        </div>
  
        {/* Product Management Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Manage Products</h2>
  
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="px-6 py-2 text-left">Product ID</th>
                <th className="px-6 py-2 text-left">Name</th>
                <th className="px-6 py-2 text-left">Price</th>
                <th className="px-6 py-2 text-left">Stock</th>
                <th className="px-6 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-6 py-2">{product.id}</td>
                  <td className="px-6 py-2">{product.name}</td>
                  <td className="px-6 py-2">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-2">
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => handleStockChange(product.id, parseInt(e.target.value))}
                      className="border rounded-md p-2 w-20"
                    />
                  </td>
                  <td className="px-6 py-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  