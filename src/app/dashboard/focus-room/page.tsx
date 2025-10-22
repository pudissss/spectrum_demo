import { BookingSystem } from "@/components/focus-room/booking-system";

export default function FocusRoomPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Focus Room Booking</h1>
                <p className="text-muted-foreground">
                    Check availability and book the Focus Room for your meetings.
                </p>
            </div>
            <BookingSystem />
        </div>
    );
}
