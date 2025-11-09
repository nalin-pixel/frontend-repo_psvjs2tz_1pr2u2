import React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export const STATUS_FLOW = [
  "processing",
  "washed",
  "dried",
  "ready for pickup",
  "completed",
];

export default function StatusTracker({ status }) {
  return (
    <div className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {STATUS_FLOW.map((s, idx) => {
          const active = STATUS_FLOW.indexOf(status) >= idx;
          const isCurrent = STATUS_FLOW.indexOf(status) === idx;
          return (
            <li key={s} className="flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                    active
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {active ? (
                    isCurrent && status !== "completed" ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )
                  ) : (
                    <span className="text-xs">{idx + 1}</span>
                  )}
                </div>
                <span className={`text-sm ${active ? "text-gray-900" : "text-gray-400"}`}>
                  {s}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
