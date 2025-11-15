"use client";

import { useMemo } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ALL_LOGIN_LOGS } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ShieldAlert } from 'lucide-react';

export function AuditLog() {
    const { user } = useAuth();

    const sortedLogs = useMemo(() => {
        return [...ALL_LOGIN_LOGS].sort((a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime());
    }, []);

    if (user?.role !== 'Superadmin') {
        return (
            <Card className="border-destructive">
                <CardHeader className="flex flex-row items-center gap-4">
                    <ShieldAlert className="h-8 w-8 text-destructive" />
                    <div>
                        <CardTitle className="text-destructive">Access Denied</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>You do not have the necessary permissions to view this audit log.</p>
                </CardContent>
            </Card>
        );
    }
    
    if (sortedLogs.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No login events recorded yet.</p>
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{format(parseISO(log.timestamp), 'MMM d, yyyy, h:mm:ss a')}</TableCell>
                            <TableCell>{log.userName}</TableCell>
                            <TableCell><Badge variant="secondary">{log.userRole}</Badge></TableCell>
                            <TableCell>
                                <Badge variant={log.action === 'Login' ? 'default' : 'outline'}>{log.action}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
