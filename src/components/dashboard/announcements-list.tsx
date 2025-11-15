"use client";

import { useMemo, useState } from "react";
import { ALL_ANNOUNCEMENTS } from "@/lib/data";
import { Announcement } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { EyeOff } from "lucide-react";

export function AnnouncementsList() {
    const { user } = useAuth();
    const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>(ALL_ANNOUNCEMENTS);

    const announcements = useMemo(() => {
        if (!user) return [];
        
        const canViewAll = user.role === 'President' || user.role === 'Vice President' || user.role === 'HOD' || user.role === 'Superadmin';
        
        if (canViewAll) {
            return allAnnouncements;
        }

        if (user.role === 'Director') {
            return allAnnouncements;
        }
        
        return allAnnouncements.filter(ann => !ann.forDirectorsOnly);

    }, [allAnnouncements, user]);
    
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
             {announcements.map((announcement) => {
                const isDirectorsOnly = announcement.forDirectorsOnly;

                if (announcement.imageUrl) {
                    return (
                        <Card key={announcement.id} className="overflow-hidden relative text-white">
                            <div className="absolute inset-0 bg-black/50 z-10"/>
                            <Image src={announcement.imageUrl} alt={announcement.title} layout="fill" objectFit="cover" className="z-0"/>
                            <div className="relative z-20 flex flex-col justify-between h-full p-6">
                                <div>
                                    <CardHeader className="p-0">
                                        <CardTitle className="flex items-center gap-2">
                                            {announcement.title}
                                            {isDirectorsOnly && <Badge variant="destructive" className="flex items-center gap-1"><EyeOff className="h-3 w-3"/>Directors Only</Badge>}
                                        </CardTitle>
                                        <CardDescription className="text-gray-300">
                                            Posted on {format(parseISO(announcement.date), 'MMMM d, yyyy \'at\' h:mm a')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-4">
                                        <p className="whitespace-pre-wrap">{announcement.content}</p>
                                    </CardContent>
                                </div>
                                <CardFooter className="p-0 mt-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border-2 border-white">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${announcement.authorName}`} />
                                            <AvatarFallback>{announcement.authorName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm text-white">{announcement.authorName}</p>
                                            <Badge variant="secondary" className="text-xs">{announcement.authorRole}</Badge>
                                        </div>
                                    </div>
                                </CardFooter>
                            </div>
                        </Card>
                    );
                }
                
                return (
                    <Card key={announcement.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {announcement.title}
                                {isDirectorsOnly && <Badge variant="destructive" className="flex items-center gap-1"><EyeOff className="h-3 w-3"/>Directors Only</Badge>}
                            </CardTitle>
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
                );
            })}
        </div>
    );
}
