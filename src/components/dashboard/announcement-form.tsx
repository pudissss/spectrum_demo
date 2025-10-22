"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Megaphone, Image as ImageIcon, X } from "lucide-react";
import { Announcement } from "@/lib/types";
import { ALL_ANNOUNCEMENTS } from "@/lib/data";
import Image from "next/image";
import { Label } from "../ui/label";

export function AnnouncementForm() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const canAnnounce = user?.role === 'President' || user?.role === 'Vice President' || user?.role === 'HOD';

    if (!canAnnounce) {
        return null;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        // Also reset the file input
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
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
        
        // In a real app, you'd upload the imageFile to a storage service and get a URL.
        // For this mock, we'll just use the preview URL if it exists.
        const imageUrl = imagePreview;

        const newAnnouncement: Announcement = {
            id: `ann-${Date.now()}`,
            date: new Date().toISOString(),
            title,
            content,
            authorName: user.name,
            authorRole: user.role,
            imageUrl: imageUrl || undefined,
        };

        ALL_ANNOUNCEMENTS.unshift(newAnnouncement);

        setIsLoading(false);
        setTitle("");
        setContent("");
        removeImage();
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
                    Create a new announcement. You can optionally add an image.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {imagePreview && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                             <Image src={imagePreview} alt="Announcement image preview" layout="fill" objectFit="cover" />
                             <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7"
                                onClick={removeImage}
                             >
                                <X className="h-4 w-4" />
                             </Button>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Announcement Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading}
                                className="text-lg font-semibold"
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="image-upload">Image (Optional)</Label>
                             <Input
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                                disabled={isLoading}
                                accept="image/*"
                                className="pt-2 text-sm"
                            />
                        </div>
                    </div>
                   
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
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
