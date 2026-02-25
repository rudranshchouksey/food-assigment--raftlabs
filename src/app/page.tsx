"use client";
import { useEffect, useState } from 'react';
import MenuCard from '@/components/MenuCard';
import CartDrawer from '@/components/CardDrawer';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    fetch('/api/menu').then(res => res.json()).then(setMenu);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-10 right-10 bg-slate-900 text-white p-5 rounded-4xl shadow-2xl z-40 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group border-4 border-white"
      >
        <div className="relative">
          <ShoppingBag size={28} className="group-hover:rotate-12 transition-transform" />
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-orange-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in ring-4 ring-slate-900">
              {totalItems}
            </span>
          )}
        </div>
        <span className="font-black text-xs tracking-[0.2em] uppercase pr-2">View Order</span>
      </button>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4 italic tracking-tighter">THE MENU</h1>
          <p className="text-slate-500 font-medium">Over 50 premium dishes delivered live to your doorstep.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {menu.map((item: any) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}