import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MAX_BOOKING_ROOMS,
  MAX_CHILD_AGE,
  MAX_GUESTS_PER_ROOM,
  type RoomOccupancy,
  defaultRoomOccupancy,
  maxChildrenForAdults,
  normalizeRoomOccupancy,
  syncChildAges,
  totalGuestsFromRooms,
} from "./booking/roomOccupancy";

type Props = {
  rooms: RoomOccupancy[];
  onChange: (next: RoomOccupancy[]) => void;
  /** Sticky floating dock: cap width so the row stays compact. */
  floatingDock?: boolean;
};

export function RoomGuestsSelector({
  rooms,
  onChange,
  floatingDock,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const totals = useMemo(() => totalGuestsFromRooms(rooms), [rooms]);
  const summary = useMemo(() => {
    const r = rooms.length;
    const g = totals.adults + totals.children;
    return `${r} room${r === 1 ? "" : "s"} · ${g} guest${g === 1 ? "" : "s"}`;
  }, [rooms.length, totals.adults, totals.children]);

  const setRoom = (index: number, patch: Partial<RoomOccupancy>) => {
    const next = rooms.map((room, i) => {
      if (i !== index) return room;
      let adults = patch.adults ?? room.adults;
      let children = patch.children ?? room.children;
      if (patch.adults !== undefined || patch.children !== undefined) {
        const n = normalizeRoomOccupancy(adults, children);
        adults = n.adults;
        children = n.children;
      }
      let childAges = patch.childAges ?? room.childAges;
      if (patch.children !== undefined || patch.adults !== undefined) {
        childAges = syncChildAges(childAges, children);
      } else if (patch.childAges !== undefined) {
        childAges = syncChildAges(patch.childAges, children);
      }
      return { adults, children, childAges };
    });
    onChange(next);
  };

  const addRoom = () => {
    if (rooms.length >= MAX_BOOKING_ROOMS) return;
    onChange([...rooms, defaultRoomOccupancy()]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length <= 1) return;
    onChange(rooms.filter((_, i) => i !== index));
  };

  return (
    <div
      ref={rootRef}
      className={
        floatingDock
          ? "relative flex min-w-0 flex-1 basis-0 flex-col gap-0.5 text-left"
          : "relative min-w-0 flex-1 lg:max-w-[260px]"
      }
    >
      <span
        className="mb-0.5 block text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold"
      >
        Rooms &amp; guests
      </span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center justify-between gap-1.5 rounded-md border border-gold/45 bg-white px-2 text-left text-xs text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
        aria-expanded={open}
        aria-haspopup="dialog"
        data-ocid="home.search.rooms.trigger"
      >
        <span className="truncate">{summary}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
        )}
      </button>

      {open ? (
        <div
          className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-[min(70vh,520px)] overflow-y-auto rounded-lg border border-gold/35 bg-white p-2.5 shadow-lg shadow-black/15 sm:p-3"
          aria-label="Rooms and guests"
        >
          <div className="flex flex-col gap-2">
            {rooms.map((room, index) => {
              const maxAdults = Math.min(
                MAX_GUESTS_PER_ROOM,
                Math.max(1, MAX_GUESTS_PER_ROOM - room.children),
              );
              const maxChildren = maxChildrenForAdults(room.adults);
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: controlled list; rows have no stable server id
                  key={index}
                  className="rounded-md border border-gold/25 bg-stone-50/80 p-2.5 sm:p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold">
                      Room {index + 1}
                    </span>
                    {rooms.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeRoom(index)}
                        className="inline-flex items-center gap-1 rounded border border-charcoal/15 px-2 py-1 text-[0.65rem] uppercase tracking-wider text-charcoal/70 transition hover:bg-cream/5"
                        aria-label={`Remove room ${index + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        Remove
                      </button>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex flex-col gap-0.5 text-left">
                      <span className="text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-charcoal/50">
                        Adults
                      </span>
                      <select
                        value={Math.min(room.adults, maxAdults)}
                        onChange={(e) =>
                          setRoom(index, {
                            adults: Number(e.target.value),
                          })
                        }
                        className="h-9 w-full rounded-md border border-gold/35 bg-white px-1.5 text-xs text-charcoal outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                        aria-label={`Room ${index + 1} adults`}
                      >
                        {Array.from({ length: maxAdults }, (_, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: fixed numeric options
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-0.5 text-left">
                      <span className="text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-charcoal/50">
                        Children
                      </span>
                      <select
                        value={Math.min(room.children, maxChildren)}
                        onChange={(e) =>
                          setRoom(index, {
                            children: Number(e.target.value),
                          })
                        }
                        className="h-9 w-full rounded-md border border-gold/35 bg-white px-1.5 text-xs text-charcoal outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                        aria-label={`Room ${index + 1} children`}
                      >
                        {Array.from({ length: maxChildren + 1 }, (_, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: fixed numeric options
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {room.children > 0 ? (
                    <div className="mt-3 space-y-2 border-t border-gold/15 pt-3">
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-charcoal/50">
                        Child ages (0–{MAX_CHILD_AGE})
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                        {Array.from({ length: room.children }, (_, ci) => (
                          <label
                            // biome-ignore lint/suspicious/noArrayIndexKey: age fields indexed by child order
                            key={ci}
                            className="flex flex-col gap-1 text-left"
                          >
                            <span className="text-[0.55rem] uppercase tracking-wider text-charcoal/45">
                              Child {ci + 1}
                            </span>
                            <input
                              type="number"
                              min={0}
                              max={MAX_CHILD_AGE}
                              value={room.childAges[ci] ?? 0}
                              onChange={(e) => {
                                const v = Math.max(
                                  0,
                                  Math.min(
                                    MAX_CHILD_AGE,
                                    Number(e.target.value) || 0,
                                  ),
                                );
                                const ages = [...room.childAges];
                                ages[ci] = v;
                                setRoom(index, { childAges: ages });
                              }}
                              className="h-8 w-full rounded-md border border-gold/35 bg-white px-1.5 text-xs text-charcoal outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={addRoom}
            disabled={rooms.length >= MAX_BOOKING_ROOMS}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-gold/50 py-2 text-xs font-medium text-charcoal transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-45"
            data-ocid="home.search.rooms.add"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add a room
            {rooms.length >= MAX_BOOKING_ROOMS ? " (max 10)" : ""}
          </button>
        </div>
      ) : null}
    </div>
  );
}
