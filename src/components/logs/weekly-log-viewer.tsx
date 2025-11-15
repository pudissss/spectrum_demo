"use client";

import { useMemo } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ALL_LOGS } from '@/lib/data';
import { WeeklyLog } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

const getProgressBadgeVariant = (progress: WeeklyLog['progress']) => {
    switch (progress) {
        case 'On Track':
            return 'default';
        case 'Completed':
            return 'outline';
        case 'Delayed':
            return 'destructive';
        default:
            return 'secondary';
    }
};

export function WeeklyLogViewer() {
    const { user } = useAuth();

    const filteredLogs = useMemo(() => {
        if (!user) return [];
        if (user.role === 'President' || user.role === 'Vice President' || user.role === 'HOD' || user.role === 'Superadmin') {
            return ALL_LOGS;
        }
        if (user.role === 'Director' && user.wing) {
            return ALL_LOGS.filter(log => log.wing === user.wing);
        }
        return [];
    }, [user]);

    if (filteredLogs.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No logs found.</p>
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Lead</TableHead>
                        <TableHead>Wing</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Progress</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{format(parseISO(log.date), 'MMM d, yyyy')}</TableCell>
                            <TableCell>{log.leadName}</TableCell>
                            <TableCell>{log.wing}</TableCell>
                            <TableCell className="max-w-md truncate">{log.description}</TableCell>
                            <TableCell>
                                <Badge variant={getProgressBadgeVariant(log.progress)}>{log.progress}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
