"use client";

import { useState, useMemo, useEffect } from "react";
import { format, add, parse } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { ALL_BOOKINGS } from "@/lib/data";
import { FocusRoomBooking } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar as CalendarIcon, Clock, User, PlusCircle, Trash2 } from "lucide-react";

const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // 8 AM to 7 PM
    return `${hour.toString().padStart(2, '0')}:00`;
});

export function BookingSystem() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [bookings, setBookings] = useState<FocusRoomBooking[]>(ALL_BOOKINGS);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(60); // Default 60 minutes
    const [isLoading, setIsLoading] = useState(false);
    
    // Timer state
    const [activeMeeting, setActiveMeeting] = useState<FocusRoomBooking | null>(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (activeMeeting) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else if (!activeMeeting && timer !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [activeMeeting, timer]);

    const bookingsOnSelectedDate = useMemo(() => {
        if (!date) return [];
        const formattedDate = format(date, "yyyy-MM-dd");
        return bookings.filter(b => b.date === formattedDate);
    }, [date, bookings]);

    const isSlotBooked = (slot: string) => {
        const slotTime = parse(slot, "HH:mm", new Date());
        return bookingsOnSelectedDate.some(booking => {
            const bookingStart = parse(booking.startTime, "HH:mm", new Date());
            const bookingEnd = parse(booking.endTime, "HH:mm", new Date());
            return slotTime >= bookingStart && slotTime < bookingEnd;
        });
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !selectedTime || !title || !user) {
            toast({ variant: "destructive", title: "Missing Information" });
            return;
        }

        setIsLoading(true);
        const startTime = selectedTime;
        const startDateTime = parse(startTime, 'HH:mm', date);
        const endDateTime = add(startDateTime, { minutes: duration });
        const endTime = format(endDateTime, 'HH:mm');
        
        // Double booking check
        const newBookingStart = parse(startTime, 'HH:mm', new Date());
        const newBookingEnd = parse(endTime, 'HH:mm', new Date());

        const conflict = bookings.some(b => {
            if (b.date !== format(date, "yyyy-MM-dd")) return false;
            const existingStart = parse(b.startTime, 'HH:mm', new Date());
            const existingEnd = parse(b.endTime, 'HH:mm', new Date());
            return (newBookingStart < existingEnd && newBookingEnd > existingStart);
        });

        if (conflict) {
            toast({ variant: "destructive", title: "Booking Conflict", description: "This time slot is already booked or overlaps with another booking." });
            setIsLoading(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        const newBooking: FocusRoomBooking = {
            id: `book-${Date.now()}`,
            bookedBy: user.id,
            bookedByName: user.name,
            date: format(date, "yyyy-MM-dd"),
            startTime,
            endTime,
            title,
        };
        setBookings([...bookings, newBooking]);
        toast({ title: "Booking successful!" });
        setSelectedTime("");
        setTitle("");
        setIsLoading(false);
    };

    const upcomingBookings = useMemo(() => 
        bookings
            .filter(b => new Date(b.date + 'T' + b.startTime) >= new Date())
            .sort((a,b) => new Date(a.date + 'T' + a.startTime).getTime() - new Date(b.date + 'T' + b.startTime).getTime())
            .slice(0, 5),
    [bookings]);

    const formatTimer = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Book the Room</CardTitle>
                    <CardDescription>Select a date and time slot.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Available Slots for {date ? format(date, "PPP") : '...'}</h3>
                        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
                            {timeSlots.map(slot => {
                                const booked = isSlotBooked(slot);
                                return (
                                    <Button
                                        key={slot}
                                        variant={booked ? "destructive" : selectedTime === slot ? "default" : "outline"}
                                        disabled={booked}
                                        onClick={() => setSelectedTime(slot)}
                                    >
                                        {slot}
                                    </Button>
                                );
                            })}
                        </div>
                        {selectedTime && (
                             <form onSubmit={handleBooking} className="mt-4 space-y-4 rounded-lg border p-4 bg-background">
                                <h4 className="font-semibold">Book for {selectedTime}</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Meeting Title</Label>
                                    <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Wing Sync" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (minutes)</Label>
                                    <Input id="duration" type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value))} required min="15" step="15"/>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
                                </Button>
                             </form>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Meeting Timer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {activeMeeting ? (
                            <div className="text-center">
                                <p className="text-muted-foreground">{activeMeeting.title}</p>
                                <p className="font-mono text-4xl font-bold my-2">{formatTimer(timer)}</p>
                                <Button onClick={() => {
                                    setActiveMeeting(null);
                                    toast({ title: "Meeting Ended", description: `Duration: ${formatTimer(timer)}`});
                                    setTimer(0);
                                }} variant="destructive">Stop Meeting</Button>
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No active meeting.</p>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Reservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {upcomingBookings.map(b => (
                                <li key={b.id} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-primary/10 text-primary rounded-md h-10 w-10 flex flex-col items-center justify-center">
                                        <span className="text-xs font-bold">{format(new Date(b.date), 'MMM')}</span>
                                        <span className="text-lg font-bold -mt-1">{format(new Date(b.date), 'd')}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{b.title}</p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                           <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {b.startTime} - {b.endTime}</span>
                                           <span className="flex items-center gap-1"><User className="w-3 h-3"/> {b.bookedByName}</span>
                                        </div>
                                    </div>
                                    {user?.id === b.bookedBy && !activeMeeting &&
                                        <Button size="sm" onClick={() => setActiveMeeting(b)}>Start</Button>}
                                </li>
                            ))}
                        </ul>
                         {upcomingBookings.length === 0 && <p className="text-muted-foreground text-center py-4">No upcoming reservations.</p>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
