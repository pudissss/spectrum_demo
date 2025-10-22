import { AnnouncementsList } from "@/components/dashboard/announcements-list";
import { AnnouncementForm } from "@/components/dashboard/announcement-form";

export default function AnnouncementsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Announcements</h1>
                <p className="text-muted-foreground">
                    Stay updated with the latest news from the student body.
                </p>
            </div>
            <AnnouncementForm />
            <AnnouncementsList />
        </div>
    );
}
