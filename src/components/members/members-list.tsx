"use client";

import { useAuth } from "@/hooks/use-auth";
import { ALL_USERS } from "@/lib/data";
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
        case "President":
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
    
    // Only President and HOD can see this page.
    if (user?.role !== 'President' && user?.role !== 'HOD') {
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
                <CardTitle>All Members</CardTitle>
                <CardDescription>A list of everyone in the student body.</CardDescription>
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
                        {ALL_USERS.map((member) => (
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
