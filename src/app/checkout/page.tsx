"use client";
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { CreditCard, MapPin, Phone, User, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ customerName: '', address: '', phone: '' });

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Your cart is empty");
    
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items }),
      });

      if (res.ok) {
        const order = await res.json();
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/orders/${order.id}`); 
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Submission failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-8 font-bold text-sm group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-white">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-3">
                <MapPin className="text-orange-600" /> Delivery Details
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        placeholder="John Doe" 
                        className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium"
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        placeholder="10-digit mobile" 
                        type="tel"
                        className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Shipping Address</label>
                  <textarea 
                    placeholder="Street, Landmark, Apartment..." 
                    rows={3}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium resize-none"
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required 
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={loading || items.length === 0}
                    className="w-full bg-slate-900 hover:bg-orange-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:shadow-none active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={22} />}
                    {loading ? "AUTHENTICATING..." : `PAY $${total.toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white sticky top-24">
              <h2 className="text-xl font-black italic uppercase mb-8">Summary</h2>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase">{item.quantity} units</p>
                    </div>
                    <span className="font-black text-slate-700">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <span>Delivery</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="font-black text-slate-900">GRAND TOTAL</span>
                  <span className="text-3xl font-black text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}