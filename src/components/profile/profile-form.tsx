"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera } from 'lucide-react';

export function ProfileForm() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[1][0]}`;
        }
        return name.substring(0, 2);
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call to update profile
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast({
            title: "Profile Updated",
            description: "Your information has been successfully updated.",
        });
    };

    if (!user) return null;

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Make changes to your profile here. Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={avatarPreview || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 flex items-center justify-center h-8 w-8 bg-primary rounded-full cursor-pointer hover:bg-primary/90">
                                <Camera className="h-4 w-4 text-primary-foreground" />
                                <Input id="avatar-upload" type="file" className="sr-only" onChange={handleAvatarChange} accept="image/*" />
                            </Label>
                        </div>
                        <div className="space-y-1">
                             <h2 className="text-2xl font-bold">{user.name}</h2>
                             <p className="text-muted-foreground">{user.email}</p>
                             <p className="text-sm text-muted-foreground">{user.role}{user.wing && ` - ${user.wing}`}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" placeholder="********" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" placeholder="New Password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
