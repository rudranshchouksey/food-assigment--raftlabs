"use client";
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { Plus, Flame, Star, Clock } from 'lucide-react';
import Image from "next/image";

export default function MenuCard({ item }: { item: any }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(item);
    toast.success(`${item.name} added!`, {
      description: "Item is waiting in your cart.",
      icon: <Plus className="h-4 w-4 text-orange-600" />,
    });
  };

  const isPremium = item.price > 15;

  return (
    <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/50 shadow-xl">
          <span className="text-lg font-black text-slate-900 tracking-tighter">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          {isPremium && (
            <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-orange-200">
              <Flame size={12} fill="currentColor" /> Popular
            </div>
          )}
          <div className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-white">
            <Clock size={12} /> 15-20 min
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tight">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-orange-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-slate-900">4.9</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 h-10 mb-8 font-medium">
          {item.description}
        </p>

        <button 
          onClick={handleAdd}
          className="group/btn relative w-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-3xl overflow-hidden transition-all active:scale-95 hover:bg-orange-600 shadow-xl shadow-slate-200"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Plus size={18} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform duration-300" /> 
            Add to Order
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}