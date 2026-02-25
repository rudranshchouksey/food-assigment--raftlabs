"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import OrderStatusStepper from '@/components/OrderStatusStepper';
import { Bike, MapPin, Package, Phone, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch(`/api/orders/${id}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        if (data.status === 'Delivered') clearInterval(interval);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 4000); // Polling every 4s
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Connecting to Kitchen...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors mb-6 font-bold text-sm">
          <ChevronLeft size={16} /> Back to Menu
        </Link>
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100/50 overflow-hidden border border-white">
          <div className="bg-slate-900 p-10 text-white relative">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
              <Package size={120} />
            </div>
            <p className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-2">Live Tracking</p>
            <h1 className="text-3xl font-black italic tracking-tight uppercase">
              {order.status === 'Delivered' ? 'Order Arrived' : 'Food in Progress'}
            </h1>
            <p className="text-slate-400 font-mono text-xs mt-4">Order ID: {id}</p>
          </div>

          <div className="p-10">
            <OrderStatusStepper currentStatus={order.status} />
            
            <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Details</h3>
                <p className="font-bold flex items-center gap-2"><MapPin size={18} className="text-orange-600" /> {order.address}</p>
                <p className="text-sm text-slate-500 flex items-center gap-2 font-medium"><Phone size={16} /> {order.phone}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Summary</h3>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-slate-500">Paid Amount</span>
                  <span className="text-2xl font-black text-slate-900">${order.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}