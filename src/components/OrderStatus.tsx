"use client";
import { CheckCircle2, Clock, Truck, PackageCheck } from 'lucide-react';

const statuses = [
  { label: 'Order Received', icon: Clock },
  { label: 'Preparing', icon: PackageCheck },
  { label: 'Out for Delivery', icon: Truck },
  { label: 'Delivered', icon: CheckCircle2 },
];

export default function OrderStatus({ currentStatus }: { currentStatus: string }) {
  const currentIndex = statuses.findIndex(s => s.label === currentStatus);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-8">
      {statuses.map((status, index) => {
        const Icon = status.icon;
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={status.label} className="flex items-center gap-3 relative w-full">
            <div className={`p-3 rounded-full ${isActive ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-400'} ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}>
              <Icon size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                {status.label}
              </span>
            </div>
            {index < statuses.length - 1 && (
              <div className={`hidden md:block h-1 flex-1 mx-2 ${index < currentIndex ? 'bg-orange-600' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}