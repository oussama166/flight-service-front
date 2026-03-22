// src/Components/FeaturesUi/PassengerDropdown.tsx
import { useRef, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/App/hooks";
import { increment, decrement } from "@/Features/FlightInfo/passangerSlice";
import { MAX_PASSENGERS } from "@/Types/Redux/type";
import Icon from "@mui/material/Icon";

type PassengerType = 'adult' | 'child' | 'infant';

const passengers: { type: PassengerType; label: string; description: string }[] = [
    { type: 'adult',  label: 'Adult',  description: '12+ years' },
    { type: 'child',  label: 'Child',  description: '2–11 years' },
    { type: 'infant', label: 'Infant', description: 'Under 2' },
];

const PassengerDropdown = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { adult, child, infant, total } = useAppSelector((s) => s.passenger);
    const counts = { adult, child, infant };
    const isMax = total >= MAX_PASSENGERS;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger button */}
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
                <Icon baseClassName="material-symbols-outlined text-lg">group</Icon>
                {total} Passenger{total > 1 ? 's' : ''}
                <Icon
                    baseClassName="material-symbols-outlined text-lg"
                    sx={{
                        transition: 'transform 0.2s',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    expand_more
                </Icon>
            </button>

            {/* Popup */}
            {open && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-50">
                    {/* Header */}
                    <div className="px-4 pt-4 pb-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-700">Passengers</p>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-1 py-1">
                        {passengers.map(({ type, label, description }) => (
                            <div
                                key={type}
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-700">{label}</span>
                                    <span className="text-xs text-slate-400">{description}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => dispatch(decrement(type))}
                                        disabled={type === 'adult' ? counts[type] <= 1 : counts[type] <= 0}
                                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500
                                                   hover:border-primary hover:text-primary hover:bg-primary/5
                                                   disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Icon baseClassName="material-symbols-outlined" sx={{ fontSize: 18 }}>remove</Icon>
                                    </button>

                                    <span className="w-4 text-center text-sm font-bold text-slate-700">
                                        {counts[type]}
                                    </span>

                                    <button
                                        onClick={() => dispatch(increment(type))}
                                        disabled={isMax}
                                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500
                                                   hover:border-primary hover:text-primary hover:bg-primary/5
                                                   disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Icon baseClassName="material-symbols-outlined" sx={{ fontSize: 18 }}>add</Icon>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Total indicator */}
                        <div className="mx-4 mt-1 pt-3 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs text-slate-400">Max {MAX_PASSENGERS} passengers</span>
                            <span className={`text-xs font-semibold ${isMax ? 'text-red-400' : 'text-slate-500'}`}>
                                {total} / {MAX_PASSENGERS}
                            </span>
                        </div>
                    </div>

                    {/* Done button */}
                    <div className="px-4 pb-4 pt-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PassengerDropdown;