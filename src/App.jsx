import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import OrderCard from "./components/OrderCard";
import History from "./components/History";
import { STATUS_FLOW } from "./components/StatusTracker";

const STORAGE_KEY = "cleanup_orders_v1";
const NOTIF_KEY = "cleanup_notifications_v1";

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function loadNotifications() {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotifications(notifs) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(notifs));
}

export default function App() {
  const [orders, setOrders] = useState(loadOrders());
  const [selectedId, setSelectedId] = useState(null);
  const [notifications, setNotifications] = useState(loadNotifications());

  useEffect(() => saveOrders(orders), [orders]);
  useEffect(() => saveNotifications(notifications), [notifications]);

  const selected = useMemo(
    () => orders.find((o) => o.id === selectedId) || orders[0] || null,
    [orders, selectedId]
  );

  function notify(message) {
    const n = { id: crypto.randomUUID(), message, at: new Date().toISOString() };
    setNotifications((prev) => [n, ...prev].slice(0, 20));
  }

  function createOrder({ name, service, items, pickupDate, deliveryDate, price }) {
    const serviceLabel =
      service === "wash-fold" ? "Wash & Fold" : service === "express" ? "Express" : "Dry Clean";
    const order = {
      id: crypto.randomUUID(),
      name,
      service,
      serviceLabel,
      items,
      pickupDate,
      deliveryDate,
      price,
      status: STATUS_FLOW[0],
      timeline: [{ status: STATUS_FLOW[0], at: new Date().toISOString() }],
      rating: null,
    };
    setOrders((prev) => [order, ...prev]);
    setSelectedId(order.id);
    notify(`Order #${order.id.slice(-6).toUpperCase()} created`);

    // Simulate live progress notifications over time
    simulateProgress(order.id);
  }

  function advanceStatus(id) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = STATUS_FLOW.indexOf(o.status);
        const next = STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
        if (next !== o.status) {
          notify(`Order #${o.id.slice(-6).toUpperCase()} → ${next}`);
        }
        return {
          ...o,
          status: next,
          timeline: [...o.timeline, { status: next, at: new Date().toISOString() }],
        };
      })
    );
  }

  function simulateProgress(id) {
    // schedule automatic progress through statuses
    let delay = 1500; // start after 1.5s
    STATUS_FLOW.slice(1).forEach((s, i) => {
      setTimeout(() => {
        setOrders((prev) =>
          prev.map((o) => {
            if (o.id !== id) return o;
            if (STATUS_FLOW.indexOf(o.status) < STATUS_FLOW.indexOf(s)) {
              notify(`Order #${o.id.slice(-6).toUpperCase()} → ${s}`);
              return {
                ...o,
                status: s,
                timeline: [...o.timeline, { status: s, at: new Date().toISOString() }],
              };
            }
            return o;
          })
        );
      }, delay + i * 2000);
    });
  }

  function rateOrder(id) {
    const rating = parseInt(prompt("Rate this service 1-5"), 10);
    if (!rating || rating < 1 || rating > 5) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, rating } : o)));
    notify(`Thanks for rating your order ${rating}/5`);
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header notifications={notifications} onClearNotifications={clearNotifications} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrderForm onCreate={createOrder} />

          {selected ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Tracking</h2>
              <OrderCard order={selected} onAdvance={advanceStatus} onRate={rateOrder} />
            </div>
          ) : null}
        </div>
        <aside className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Orders</h2>
            <History orders={orders} onSelect={setSelectedId} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Notifications</h3>
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {notifications.length === 0 && (
                <p className="text-sm text-gray-500">No alerts yet.</p>
              )}
              {notifications.map((n) => (
                <div key={n.id} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  <div>
                    <p>{n.message}</p>
                    <p className="text-xs text-gray-400">{new Date(n.at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CleanUp — Fast, friendly laundry service.
      </footer>
    </div>
  );
}
