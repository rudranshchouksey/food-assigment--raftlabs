"use client";
import { Check, Clock, UtensilsCrossed, Bike, Home } from 'lucide-react';

const steps = [
  { label: 'Order Received', status: 'Order Received', icon: Clock },
  { label: 'Preparing', status: 'Preparing', icon: UtensilsCrossed },
  { label: 'Out for Delivery', status: 'Out for Delivery', icon: Bike },
  { label: 'Delivered', status: 'Delivered', icon: Home },
];

export default function OrderStatusStepper({ currentStatus }: { currentStatus: string }) {
  const currentIdx = steps.findIndex(s => s.status === currentStatus);

  return (
    <div className="relative flex justify-between w-full mt-12">
      
      <div className="absolute top-5 left-0 w-full h-1 bg-slate-800" />
      <div 
        className="absolute top-5 left-0 h-1 bg-orange-600 transition-all duration-1000 ease-in-out" 
        style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = idx < currentIdx;
        const isCurrent = idx === currentIdx;

        return (
          <div key={step.label} className="relative z-10 flex flex-col items-center">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
              isCompleted || isCurrent ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]' : 'bg-slate-800 text-slate-500'
            }`}>
              {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
            </div>
            <span className={`mt-4 text-[10px] font-black uppercase tracking-tighter ${
              isCurrent ? 'text-orange-500' : isCompleted ? 'text-white' : 'text-slate-600'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}