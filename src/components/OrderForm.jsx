import React, { useMemo, useState } from "react";
import { Calendar, Plus, Shirt } from "lucide-react";

const SERVICES = {
  "wash-fold": { label: "Wash & Fold", rate: 2.0 },
  express: { label: "Express", rate: 3.0 },
  "dry-clean": { label: "Dry Clean", rate: 5.0 },
};

export default function OrderForm({ onCreate }) {
  const [service, setService] = useState("wash-fold");
  const [items, setItems] = useState(5);
  const [pickupDate, setPickupDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [name, setName] = useState("");

  const price = useMemo(() => {
    const rate = SERVICES[service].rate;
    return Math.max(0, Math.round(items * rate * 100) / 100);
  }, [service, items]);

  const canSubmit =
    name.trim().length > 0 && items > 0 && pickupDate && deliveryDate;

  function reset() {
    setService("wash-fold");
    setItems(5);
    setPickupDate("");
    setDeliveryDate("");
    setName("");
  }

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate({ name, service, items, pickupDate, deliveryDate, price });
    reset();
  }

  return (
    <form
      onSubmit={submit}
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-blue-600 text-white"><Shirt size={18} /></div>
        <h2 className="text-lg font-semibold text-gray-900">New Laundry Order</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Customer name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Johnson"
            className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 bg-white"
          >
            {Object.entries(SERVICES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label} (${val.rate.toFixed(2)}/item)
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Number of items</label>
          <input
            type="number"
            min={1}
            value={items}
            onChange={(e) => setItems(parseInt(e.target.value || "0", 10))}
            className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Pickup date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-9 pr-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Delivery date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-9 pr-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm text-gray-600 mb-1">Estimated total</label>
          <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
            <span className="text-gray-600">{SERVICES[service].label} × {items} items</span>
            <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Create order
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
