import { Shirt, Bell } from "lucide-react";
import React from "react";

export default function Header({ notifications, onClearNotifications }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-600 text-white">
            <Shirt size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">CleanUp</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Laundry, simplified</p>
          </div>
        </div>
        <button
          onClick={onClearNotifications}
          className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-sm text-gray-700"
        >
          <Bell size={16} />
          Alerts
          {notifications.length > 0 && (
            <span className="ml-1 inline-flex items-center justify-center text-xs px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
              {notifications.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
