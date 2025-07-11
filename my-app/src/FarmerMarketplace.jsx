import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Plus, Star, Phone, MapPin, Clock, Check } from 'lucide-react';

const FarmerMarketplace = () => {
  const [currentView, setCurrentView] = useState('customer'); // 'customer', 'farmer', 'login'
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Fresh Tomatoes',
      nameNepali: 'ताजा गोलभेडा',
      price: 80,
      unit: 'kg',
      farmer: 'Ram Bahadur',
      location: 'Lalitpur',
      rating: 4.5,
      image: '🍅',
      description: 'Organic tomatoes freshly harvested',
      harvestDate: '2024-01-15',
      available: true
    },
    {
      id: 2,
      name: 'Organic Potatoes',
      nameNepali: 'जैविक आलु',
      price: 60,
      unit: 'kg',
      farmer: 'Sita Devi',
      location: 'Bhaktapur',
      rating: 4.8,
      image: '🥔',
      description: 'Chemical-free potatoes from mountain farms',
      harvestDate: '2024-01-14',
      available: true
    },
    {
      id: 3,
      name: 'Fresh Spinach',
      nameNepali: 'ताजा पालुंगो',
      price: 40,
      unit: 'bundle',
      farmer: 'Krishna Tamang',
      location: 'Kathmandu',
      rating: 4.3,
      image: '🥬',
      description: 'Leafy green spinach bundles',
      harvestDate: '2024-01-16',
      available: true
    }
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    nameNepali: '',
    price: '',
    unit: 'kg',
    description: '',
    image: '🥕'
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        farmer: currentUser?.name || 'Current Farmer',
        location: 'Your Area',
        rating: 4.0,
        harvestDate: new Date().toISOString().split('T')[0],
        available: true
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        nameNepali: '',
        price: '',
        unit: 'kg',
        description: '',
        image: '🥕'
      });
    }
  };

  const totalCartValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-2">{product.image}</div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.nameNepali}</p>
      <p className="text-green-600 font-bold text-xl">Rs. {product.price}/{product.unit}</p>
      <div className="flex items-center gap-2 mt-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm">{product.rating}</span>
        <span className="text-gray-500">•</span>
        <span className="text-sm text-gray-600">{product.farmer}</span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <MapPin className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-500">{product.location}</span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
      <button 
        onClick={() => addToCart(product)}
        className="w-full bg-green-500 text-white py-2 rounded-md mt-3 hover:bg-green-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );

  const CustomerView = () => (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-700">किसान बजार</h1>
          <p className="text-gray-600">Fresh from Farm to Your Table</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentView('farmer')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Farmer Portal
          </button>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {cart.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-semibold">Rs. {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-xl font-bold">Total: Rs. {totalCartValue}</span>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const FarmerView = () => (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Farmer Dashboard</h1>
          <p className="text-gray-600">किसान ड्यासबोर्ड</p>
        </div>
        <button 
          onClick={() => setCurrentView('customer')}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          View Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                placeholder="e.g., Fresh Carrots"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">नेपाली नाम</label>
              <input
                type="text"
                value={newProduct.nameNepali}
                onChange={(e) => setNewProduct({...newProduct, nameNepali: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                placeholder="e.g., ताजा गाजर"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Price (Rs.)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="80"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Unit</label>
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="kg">kg</option>
                  <option value="bundle">bundle</option>
                  <option value="dozen">dozen</option>
                  <option value="piece">piece</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                rows={3}
                placeholder="Fresh, organic vegetables..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emoji</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                placeholder="🥕"
              />
            </div>
            <button 
              onClick={addProduct}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Products</h3>
          <div className="space-y-4">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="text-2xl">{product.image}</div>
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-gray-600 text-sm">{product.nameNepali}</p>
                      <p className="text-green-600 font-bold">Rs. {product.price}/{product.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-700">Total Products</h4>
          <p className="text-2xl font-bold text-green-600">{products.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-700">Orders Today</h4>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-700">Total Earnings</h4>
          <p className="text-2xl font-bold text-orange-600">Rs. 3,240</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'customer' ? <CustomerView /> : <FarmerView />}
      
      <div className="fixed bottom-4 right-4 flex gap-2">
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
          <Phone className="w-6 h-6" />
        </div>
        <div className="bg-white p-2 rounded-lg shadow-lg text-sm">
          <p className="font-medium">Need Help?</p>
          <p className="text-gray-600">Call: 01-4567890</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerMarketplace;