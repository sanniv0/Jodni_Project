import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StatusBar from '@/components/layout/StatusBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order, Product } from '@shared/schema';

type OrderStatus = 'active' | 'completed';

const MyOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('active');
  
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders/buyer/1'], // Assuming user ID 1 for demo
  });
  
  const { data: products } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Format date
  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get order status styling
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return 'bg-secondary-light text-secondary-dark';
      case 'delivered':
      case 'completed':
        return 'bg-success bg-opacity-10 text-success';
      case 'processing':
        return 'bg-primary-light bg-opacity-10 text-primary';
      case 'cancelled':
        return 'bg-error bg-opacity-10 text-error';
      default:
        return 'bg-neutral-200 text-neutral-700';
    }
  };
  
  // Get product details by ID
  const getProductById = (productId: number) => {
    return products?.find(product => product.id === productId);
  };
  
  // Filter orders by status
  const filterOrders = (orders: Order[] | undefined) => {
    if (!orders) return [];
    
    const activeStatuses = ['pending', 'processing', 'in transit'];
    const completedStatuses = ['delivered', 'completed', 'cancelled'];
    
    return orders.filter(order => {
      if (activeTab === 'active') {
        return activeStatuses.includes(order.status.toLowerCase());
      } else {
        return completedStatuses.includes(order.status.toLowerCase());
      }
    });
  };
  
  const filteredOrders = filterOrders(orders);
  
  // Get the main product image
  const getProductImage = (productId: number) => {
    const product = getProductById(productId);
    if (product && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return 'https://placehold.co/80x80/e2e8f0/1e293b?text=Product';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      
      <div className="bg-white p-4 border-b border-neutral-100">
        <h1 className="text-lg font-bold text-neutral-800">My Orders</h1>
      </div>
      
      {/* Orders Tabs */}
      <div className="bg-white">
        <div className="flex border-b border-neutral-100">
          <button 
            className={`flex-1 py-3 font-medium ${activeTab === 'active' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-neutral-500'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`flex-1 py-3 font-medium ${activeTab === 'completed' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-neutral-500'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="p-4 flex-1 bg-neutral-50">
        {isLoading ? (
          // Loading state
          <div className="space-y-3">
            {[1, 2].map(i => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="p-3 border-b border-neutral-100 flex justify-between items-center">
                  <div>
                    <div className="h-3 w-24 bg-neutral-200 rounded"></div>
                    <div className="h-4 w-32 bg-neutral-200 rounded mt-1"></div>
                  </div>
                  <div className="h-5 w-20 bg-neutral-200 rounded"></div>
                </div>
                <div className="p-3 flex">
                  <div className="w-16 h-16 bg-neutral-200 rounded"></div>
                  <div className="ml-3 flex-1">
                    <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
                    <div className="h-3 w-1/2 bg-neutral-200 rounded mt-1"></div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="h-4 w-16 bg-neutral-200 rounded"></div>
                      <div className="h-6 w-24 bg-neutral-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-3">
            {filteredOrders.map(order => {
              const product = getProductById(order.productId);
              return (
                <Card key={order.id} className="overflow-hidden">
                  <div className="p-3 border-b border-neutral-100 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-neutral-500">Order #{order.id}</span>
                      <p className="text-sm font-medium">{formatDate(order.orderDate || new Date())}</p>
                    </div>
                    <span className={`px-2 py-1 ${getStatusStyle(order.status)} text-xs rounded-full font-medium`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="p-3 flex">
                    <img 
                      src={getProductImage(order.productId)} 
                      alt={product?.name || 'Product image'} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-3 flex-1">
                      <h3 className="font-medium text-sm">{product?.name || 'Product'}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Qty: {order.quantity} × ₹{order.totalPrice / order.quantity}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold">₹{order.totalPrice}</span>
                        <Button 
                          className="text-xs bg-primary text-white px-2 py-1 h-auto rounded"
                          variant="default"
                          size="sm"
                        >
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800">No Orders Yet</h3>
            <p className="text-neutral-500 text-sm text-center mt-1">
              You don't have any {activeTab} orders at the moment.
            </p>
            <Button 
              className="mt-4 bg-primary text-white"
              onClick={() => setActiveTab(activeTab === 'active' ? 'completed' : 'active')}
            >
              View {activeTab === 'active' ? 'Completed' : 'Active'} Orders
            </Button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MyOrdersPage;
