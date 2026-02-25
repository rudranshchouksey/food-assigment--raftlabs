"use client";
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-2xl font-black flex items-center gap-3 italic"><ShoppingCart className="text-orange-600" /> CART</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <ShoppingCart size={80} strokeWidth={1} className="mb-4 opacity-20" />
                <p className="font-medium">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                    <p className="text-orange-600 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 hover:text-orange-600 transition-colors"><Minus size={18} /></button>
                    <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-orange-600 transition-colors"><Plus size={18} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={22} /></button>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="p-8 bg-slate-50 border-t border-slate-200">
              <div className="flex justify-between items-end mb-8">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-4xl font-black text-slate-900">${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={onClose}>
                <button className="w-full bg-slate-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 group">
                  CHECKOUT <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}