import React from "react";

export default function History({ orders, onSelect }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 bg-white">
        No orders yet. Create your first one to see it here.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(o.id)}
          className="w-full text-left rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">#{o.id.slice(-6).toUpperCase()} • {o.name}</p>
              <p className="text-xs text-gray-500">{o.serviceLabel} • {o.items} items • {o.status}</p>
            </div>
            <div className="text-right text-sm font-semibold text-gray-900">${o.price.toFixed(2)}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
