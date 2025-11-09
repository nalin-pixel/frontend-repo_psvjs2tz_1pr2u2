import React from "react";
import StatusTracker from "./StatusTracker";
import { Star } from "lucide-react";

export default function OrderCard({ order, onAdvance, onRate }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">#{order.id.slice(-6).toUpperCase()} • {order.name}</h3>
          <p className="text-sm text-gray-600 mt-0.5">
            {order.serviceLabel} • {order.items} items • ${order.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Pickup {order.pickupDate} → Delivery {order.deliveryDate}</p>
        </div>
        <div className="text-right">
          {order.rating ? (
            <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
              <Star size={14} className="fill-amber-500 text-amber-500" /> {order.rating}/5
            </span>
          ) : (
            <button
              onClick={() => onRate(order.id)}
              className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 text-sm"
            >
              <Star size={14} /> Rate
            </button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <StatusTracker status={order.status} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Current: {order.status}</span>
        <button
          onClick={() => onAdvance(order.id)}
          disabled={order.status === "completed"}
          className="rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          {order.status === "completed" ? "Completed" : "Advance status"}
        </button>
      </div>
    </div>
  );
}
