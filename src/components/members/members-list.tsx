"use client";

import { useAuth } from "@/hooks/use-auth";
import { ALL_USERS } from "@/lib/data";
import { User, UserRole } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { StarRating } from "../shared/star-rating";

const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
        case "President":
        case "Vice President":
        case "HOD":
            return "default";
        case "Director":
            return "secondary";
        case "Lead":
            return "outline";
        default:
            return "secondary";
    }
}

export function MembersList() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>(ALL_USERS);
    
    const visibleMembers = useMemo(() => {
        if (!user) return [];

        const isPrivileged = user.role === 'President' || user.role === 'Vice President' || user.role === 'HOD' || user.role === 'Superadmin';

        if (isPrivileged) {
            return users;
        }

        if (user.role === 'Director' && user.wing) {
            const leadershipRoles: UserRole[] = ['President', 'Vice President', 'Secretary', 'Treasurer'];
            const wingMembers = users.filter(member => 
                leadershipRoles.includes(member.role) || member.wing === user.wing
            );

            return wingMembers.sort((a, b) => {
                if (a.role === 'Director' && b.role !== 'Director') return -1;
                if (a.role !== 'Director' && b.role === 'Director') return 1;
                if (a.role === 'Lead' && b.role !== 'Lead') return -1;
                if (a.role !== 'Lead' && b.role === 'Lead') return 1;
                return 0;
            });
        }

        if (user.role === 'Lead' && user.wing) {
            const leadershipRoles: UserRole[] = ['President', 'Vice President'];
            const wingMembers = users.filter(member => 
                leadershipRoles.includes(member.role) || member.wing === user.wing
            ).filter(member => member.role !== 'HOD');

            return wingMembers.sort((a, b) => {
                if (a.role === 'Director' && b.role !== 'Director') return -1;
                if (a.role !== 'Director' && b.role === 'Director') return 1;
                return 0;
            });
        }

        return [];
    }, [user, users]);

     const handleRating = (leadId: string, rating: number) => {
        if (user?.role !== 'Director') return;
        // In a real app, this would be a server action
        console.log(`Director ${user.name} rated lead ${leadId} with ${rating} stars`);
        setUsers(currentUsers => currentUsers.map(u => u.id === leadId ? { ...u, rating } : u));
    }


    if (!user || visibleMembers.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page.</p>
                </CardContent>
            </Card>
        )
    }

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[1][0]}`;
        }
        return name.substring(0, 2);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Member Directory</CardTitle>
                <CardDescription>A list of relevant members in the student body.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Wing</TableHead>
                            <TableHead className="text-right">Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visibleMembers.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${member.email}`} />
                                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-0.5">
                                            <p className="font-medium">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                                </TableCell>
                                <TableCell>{member.wing || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                     {member.role === 'Lead' && (
                                        <StarRating 
                                            rating={member.rating || 0} 
                                            isEditable={user?.role === 'Director' && user.wing === member.wing}
                                            onRate={(rating) => handleRating(member.id, rating)}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
