"use client";

import { useAuth } from "@/hooks/use-auth";
import { ALL_USERS, WINGS } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { StarRating } from "../shared/star-rating";
import { Crown, Shield } from "lucide-react";

export function DirectorRatings() {
    const { user } = useAuth();
    
    const directors = ALL_USERS.filter(u => u.role === 'Director');
    const isPresident = user?.role === 'President';

    const handleRating = (directorId: string, rating: number) => {
        if (!isPresident) return;
        // In a real app, this would be a server action
        console.log(`President rated director ${directorId} with ${rating} stars`);
        // Here you would update the state or refetch data
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Director Star Ratings</CardTitle>
                <CardDescription>
                    {isPresident ? "You can rate the directors here." : "Official ratings for all wing directors."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Director</TableHead>
                            <TableHead>Wing</TableHead>
                            <TableHead className="text-right">Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {directors.map(director => (
                            <TableRow key={director.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${director.email}`} />
                                            <AvatarFallback>{director.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-0.5">
                                            <p className="font-medium">{director.name}</p>
                                            <p className="text-xs text-muted-foreground">{director.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{director.wing}</TableCell>
                                <TableCell className="text-right">
                                    <StarRating 
                                        rating={director.rating || 0} 
                                        isEditable={isPresident} 
                                        onRate={(rating) => handleRating(director.id, rating)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
