import { useState } from "react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// Full-day slots (Mon–Fri)
const SLOTS_FULL = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];
// Reduced slots (Saturday 10 AM – 4 PM)
const SLOTS_SAT  = ["09:00 AM", "11:00 AM", "01:00 PM"];

function getDayStatus(date) {
  const d = date.getDay(); // 0 = Sun
  if (d === 0) return "closed";    // Sunday — no slots
  if (d === 6) return "limited";   // Saturday — reduced
  return "open";                   // Mon–Fri — full
}

function getSlotsForDate(date) {
  const s = getDayStatus(date);
  if (s === "closed")  return [];
  if (s === "limited") return SLOTS_SAT;
  return SLOTS_FULL;
}

function toDateStr(date) {
  return date.toISOString().split("T")[0];
}

export const AvailabilityCalendar = ({ onSelect }) => {
  const todayRaw = new Date();
  todayRaw.setHours(0, 0, 0, 0);

  const [viewYear,  setViewYear]  = useState(todayRaw.getFullYear());
  const [viewMonth, setViewMonth] = useState(todayRaw.getMonth());
  const [selDate,   setSelDate]   = useState(null);
  const [selTime,   setSelTime]   = useState(null);

  /* ── navigation ── */
  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  /* ── grid math ── */
  const firstDayJs = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const leadPad    = firstDayJs === 0 ? 6 : firstDayJs - 1;    // shift to Mon-start
  const daysCount  = new Date(viewYear, viewMonth + 1, 0).getDate();

  /* ── day helpers ── */
  const isPast = (day) =>
    new Date(viewYear, viewMonth, day) < todayRaw;

  const isToday = (day) =>
    viewYear === todayRaw.getFullYear() &&
    viewMonth === todayRaw.getMonth() &&
    day === todayRaw.getDate();

  const isSelected = (day) =>
    selDate &&
    selDate.getFullYear() === viewYear &&
    selDate.getMonth() === viewMonth &&
    selDate.getDate() === day;

  /* ── interaction ── */
  const handleDayClick = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    if (isPast(day) || getDayStatus(date) === "closed") return;
    setSelDate(date);
    setSelTime(null);
    onSelect?.(toDateStr(date), null);
  };

  const handleTimeClick = (slot) => {
    setSelTime(slot);
    if (selDate) onSelect?.(toDateStr(selDate), slot);
  };

  const slots = selDate ? getSlotsForDate(selDate) : [];

  /* ── day cell style ── */
  const dayCls = (day) => {
    const date   = new Date(viewYear, viewMonth, day);
    const status = getDayStatus(date);
    const past   = isPast(day);
    const sel    = isSelected(day);
    const now    = isToday(day);

    let base = "relative flex items-center justify-center aspect-square rounded-xl text-[11.5px] font-semibold transition-all duration-150 select-none ";
    if (sel)   return base + "bg-[#DC2626] text-white shadow-[0_2px_10px_rgba(220,38,38,0.35)] scale-105 z-10";
    if (past)  return base + "text-gray-200 cursor-not-allowed";
    if (status === "closed") return base + "text-gray-200 cursor-not-allowed";
    let cls = base + "cursor-pointer ";
    if (now) cls += "ring-2 ring-[#DC2626]/35 font-black ";
    cls += status === "limited"
      ? "text-amber-600 hover:bg-amber-50"
      : "text-gray-700 hover:bg-red-50 hover:text-[#DC2626]";
    return cls;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h4 className="font-bold text-gray-900 text-sm">Pick a Slot</h4>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={prevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150"
            aria-label="Previous month"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[11px] font-black text-gray-800 min-w-[108px] text-center tracking-tight">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150"
            aria-label="Next month"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Calendar Grid ── */}
      <div className="px-4 pt-3 pb-1">
        {/* Weekday labels */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-[9px] font-bold text-gray-400 tracking-widest py-1 uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-0.5">
          {/* Leading padding */}
          {Array.from({ length: leadPad }).map((_, i) => (
            <div key={`pad-${i}`} className="aspect-square" />
          ))}

          {/* Days */}
          {Array.from({ length: daysCount }).map((_, i) => {
            const day    = i + 1;
            const date   = new Date(viewYear, viewMonth, day);
            const status = getDayStatus(date);
            const past   = isPast(day);
            const sel    = isSelected(day);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={past || status === "closed"}
                className={dayCls(day)}
                aria-label={`${day} ${MONTHS[viewMonth]}`}
                aria-pressed={sel}
              >
                {day}
                {/* Availability indicator dot */}
                {!past && !sel && status !== "closed" && (
                  <span
                    className={`absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full ${
                      status === "limited" ? "bg-amber-400" : "bg-[#DC2626]"
                    } opacity-70`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3.5 pt-3 pb-2 mt-1 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] opacity-70" />
            <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 opacity-70" />
            <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Limited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Closed</span>
          </div>
        </div>
      </div>

      {/* ── Time Slot Picker (shows after day selected) ── */}
      {selDate && (
        <div className="border-t border-gray-100 px-4 pt-3 pb-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2.5">
            {selDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
          </p>

          {slots.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleTimeClick(slot)}
                  className={`py-2 rounded-xl text-[10px] font-bold border transition-all duration-150 ${
                    selTime === slot
                      ? "bg-[#DC2626] text-white border-[#DC2626] shadow-[0_2px_8px_rgba(220,38,38,0.28)]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#DC2626]/30 hover:text-[#DC2626] hover:bg-red-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              Sundays are by appointment only — use the form or contact directly.
            </p>
          )}

          {/* Confirmation pill */}
          {selTime && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-[#DC2626]/15 animate-fade-in">
              <svg className="w-3.5 h-3.5 text-[#DC2626] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[10px] text-[#DC2626] font-bold leading-tight">
                Date &amp; time pre-filled in the form
              </p>
            </div>
          )}
        </div>
      )}

      {/* No day selected hint */}
      {!selDate && (
        <div className="px-4 pb-4 text-center">
          <p className="text-[10px] text-gray-400 font-medium">
            Tap a day to see available time slots
          </p>
        </div>
      )}
    </div>
  );
};
