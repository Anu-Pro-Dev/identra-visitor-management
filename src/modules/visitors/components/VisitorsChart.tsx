import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format, addDays, startOfWeek, isToday } from "date-fns";

const HOURS = [12, 13, 14, 15, 16, 17, 18]; // 12 PM to 6 PM
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Event = {
  id: number;
  title: string;
  company: string;
  day: number;
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
  color: string;
  avatars: string[];
};

function getWeekDays(start: Date) {
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function VisitorsChart() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "James Visit",
      company: "ABC Company · Developer",
      day: 0,
      start: { hour: 16, minute: 0 },
      end: { hour: 17, minute: 0 },
      color: "border-blue-500 bg-blue-100",
      avatars: [
        "https://github.com/shadcn.png",
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2"
      ]
    },
    {
      id: 2,
      title: "Team Meeting",
      company: "XYZ Corp · Product Manager",
      day: 3,
      start: { hour: 12, minute: 0 },
      end: { hour: 13, minute: 0 },
      color: "border-red-500 bg-red-100",
      avatars: [
        "https://i.pravatar.cc/40?img=5",
        "https://i.pravatar.cc/40?img=6"
      ]
    }
  ]);
  const [showAdd, setShowAdd] = useState<{ day: number; hour: number } | null>(null);
  const [showEvent, setShowEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({ title: "", company: "", avatars: "", color: "border-blue-500 bg-blue-100" });
  const weekDays = getWeekDays(weekStart);

  function handleAddEvent(day: number, hour: number) {
    setShowAdd({ day, hour });
    setForm({ title: "", company: "", avatars: "", color: "border-blue-500 bg-blue-100" });
  }

  function handleSaveEvent() {
    setEvents(evts => [
      ...evts,
      {
        id: Date.now(),
        title: form.title,
        company: form.company,
        day: showAdd!.day,
        start: { hour: showAdd!.hour, minute: 0 },
        end: { hour: showAdd!.hour + 1, minute: 0 },
        color: form.color,
        avatars: form.avatars.split(",").map(s => s.trim()).filter(Boolean)
      }
    ]);
    setShowAdd(null);
  }

  function handleDeleteEvent(id: number) {
    setEvents(evts => evts.filter(e => e.id !== id));
    setShowEvent(null);
  }

  return (
    <Card className="w-full min-h-[420px] flex flex-col rounded-2xl shadow-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekStart(addDays(weekStart, -7))} className="px-2 py-1 rounded bg-accent/20 hover:bg-accent/40">&lt;</button>
          <span className="font-semibold text-lg">{format(weekStart, "MMMM yyyy")}</span>
          <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="px-2 py-1 rounded bg-accent/20 hover:bg-accent/40">&gt;</button>
        </div>
        <button onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }))} className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow">Today</button>
      </div>
      <div className="flex text-xs text-muted-foreground mb-2">
        <span className="w-14 text-right pr-2">GMT+05:30</span>
        <div className="flex-1 grid grid-cols-7">
          {weekDays.map((date, i) => (
            <div key={i} className={`text-center font-bold ${isToday(date) ? "text-primary" : ""}`}>{WEEKDAYS[date.getDay()]}</div>
          ))}
        </div>
      </div>
      <div className="flex border-t border-border">
        {/* Time labels */}
        <div className="flex flex-col w-14 text-xs text-muted-foreground pt-2">
          {HOURS.map((h, i) => (
            <div key={i} className="h-16 text-right pr-2">{h > 12 ? h - 12 : h} {h < 12 ? "AM" : "PM"}</div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="flex-1 grid grid-cols-7 border-l border-border">
          {weekDays.map((date, dayIdx) => (
            <div key={dayIdx} className={`relative border-r border-border last:border-r-0`}>
              {HOURS.map((h, hourIdx) => (
                <div
                  key={hourIdx}
                  className="h-16 border-b border-border last:border-b-0 relative group cursor-pointer"
                  onClick={() => handleAddEvent(dayIdx, h)}
                >
                  <span className="absolute left-1 top-1 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">+ Add</span>
                </div>
              ))}
              {/* Render events for this day */}
              {events.filter(e => e.day === dayIdx).map(event => {
                const startIdx = event.start.hour - 12;
                const endIdx = event.end.hour - 12;
                const top = startIdx * 4;
                const height = (endIdx - startIdx + 1) * 4;
                return (
                  <div
                    key={event.id}
                    className={`absolute left-1 right-1 mt-1 ${event.color} border-l-4 rounded-lg shadow p-2 flex flex-col justify-between cursor-pointer`}
                    style={{ top: `${top}rem`, height: `${height}rem`, minHeight: '3.5rem' }}
                    onClick={() => setShowEvent(event)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground truncate">{event.title}</span>
                      <div className="flex -space-x-2">
                        {event.avatars.map((a, i) => (
                          <img key={i} src={a} alt="avatar" className="w-6 h-6 rounded-full border-2 border-white shadow" />
                        ))}
                        {event.avatars.length > 2 && (
                          <span className="ml-1 text-xs bg-muted px-2 py-0.5 rounded-full">+{event.avatars.length - 2}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.company}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <span>🕒</span>
                      <span>{`${event.start.hour > 12 ? event.start.hour - 12 : event.start.hour}:00 ${event.start.hour < 12 ? "AM" : "PM"}`} - {`${event.end.hour > 12 ? event.end.hour - 12 : event.end.hour}:00 ${event.end.hour < 12 ? "AM" : "PM"}`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h4 className="font-bold mb-2">Add Event</h4>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Company"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Avatars (comma separated URLs)"
              value={form.avatars}
              onChange={e => setForm(f => ({ ...f, avatars: e.target.value }))}
            />
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-1 rounded bg-primary text-primary-foreground font-semibold" onClick={handleSaveEvent}>Save</button>
              <button className="px-4 py-1 rounded bg-muted text-foreground border" onClick={() => setShowAdd(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEvent && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h4 className="font-bold mb-2">{showEvent.title}</h4>
            <div className="mb-2 text-sm text-muted-foreground">{showEvent.company}</div>
            <div className="flex -space-x-2 mb-2">
              {showEvent.avatars.map((a, i) => (
                <img key={i} src={a} alt="avatar" className="w-8 h-8 rounded-full border-2 border-white shadow" />
              ))}
            </div>
            <div className="mb-2 text-xs">{`${showEvent.start.hour > 12 ? showEvent.start.hour - 12 : showEvent.start.hour}:00 ${showEvent.start.hour < 12 ? "AM" : "PM"}`} - {`${showEvent.end.hour > 12 ? showEvent.end.hour - 12 : showEvent.end.hour}:00 ${showEvent.end.hour < 12 ? "AM" : "PM"}`}</div>
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-1 rounded bg-destructive text-destructive-foreground font-semibold" onClick={() => handleDeleteEvent(showEvent.id)}>Delete</button>
              <button className="px-4 py-1 rounded bg-muted text-foreground border" onClick={() => setShowEvent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
