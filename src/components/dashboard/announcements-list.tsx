"use client";

import { useState } from "react";
import { ALL_ANNOUNCEMENTS } from "@/lib/data";
import { Announcement } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export function AnnouncementsList() {
    const [announcements, setAnnouncements] = useState<Announcement[]>(ALL_ANNOUNCEMENTS);
    
    if (announcements.length === 0) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">No announcements yet.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
             <h2 className="text-2xl font-bold tracking-tight font-headline">Latest Updates</h2>
             {announcements.map((announcement) => (
                <Card key={announcement.id}>
                    <CardHeader>
                        <CardTitle>{announcement.title}</CardTitle>
                        <CardDescription>
                            Posted on {format(parseISO(announcement.date), 'MMMM d, yyyy \'at\' h:mm a')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{announcement.content}</p>
                    </CardContent>
                    <CardFooter>
                         <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${announcement.authorName}`} />
                                <AvatarFallback>{announcement.authorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-sm">{announcement.authorName}</p>
                                <Badge variant="secondary" className="text-xs">{announcement.authorRole}</Badge>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
