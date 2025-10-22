"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Megaphone } from "lucide-react";
import { Announcement } from "@/lib/types";
import { ALL_ANNOUNCEMENTS } from "@/lib/data";

export function AnnouncementForm() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const canAnnounce = user?.role === 'President' || user?.role === 'Vice President' || user?.role === 'HOD';

    if (!canAnnounce) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || !user) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please provide a title and content for the announcement.",
            });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newAnnouncement: Announcement = {
            id: `ann-${Date.now()}`,
            date: new Date().toISOString(),
            title,
            content,
            authorName: user.name,
            authorRole: user.role,
        };

        // This is a mock update. In a real app, you'd send this to a server.
        ALL_ANNOUNCEMENTS.unshift(newAnnouncement);

        setIsLoading(false);
        setTitle("");
        setContent("");
        toast({
            title: "Announcement Posted",
            description: "Your announcement is now live for everyone to see.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-6 w-6" />
                    New Announcement
                </CardTitle>
                <CardDescription>
                    Create a new announcement to be displayed on all dashboards.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="Announcement Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                            className="text-lg font-semibold"
                        />
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Write your announcement content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                "Post Announcement"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
