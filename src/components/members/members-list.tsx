"use client";

import { useAuth } from "@/hooks/use-auth";
import { ALL_USERS } from "@/lib/data";
import { User, UserRole } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

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
    
    const visibleMembers = useMemo(() => {
        if (!user) return [];

        const isPrivileged = user.role === 'President' || user.role === 'Vice President' || user.role === 'HOD';

        if (isPrivileged) {
            return ALL_USERS;
        }

        if (user.role === 'Director' && user.wing) {
            const leadershipRoles: UserRole[] = ['President', 'Vice President', 'Secretary', 'Treasurer'];
            return ALL_USERS.filter(member => 
                leadershipRoles.includes(member.role) || member.wing === user.wing
            );
        }

        if (user.role === 'Lead' && user.wing) {
            const leadershipRoles: UserRole[] = ['President', 'Vice President'];
            const wingMembers = ALL_USERS.filter(member => 
                leadershipRoles.includes(member.role) || member.wing === user.wing
            ).filter(member => member.role !== 'HOD');

            return wingMembers.sort((a, b) => {
                if (a.role === 'Director' && b.role !== 'Director') return -1;
                if (a.role !== 'Director' && b.role === 'Director') return 1;
                return 0;
            });
        }

        return [];
    }, [user]);

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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
