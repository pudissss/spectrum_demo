"use client";

import { useState } from "react";
import { ALL_GRIEVANCES, ALL_USERS } from "@/lib/data";
import { Grievance, GrievanceStatus, User } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserCheck } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { useAuth } from "@/hooks/use-auth";

const getStatusBadgeVariant = (status: GrievanceStatus) => {
    switch (status) {
        case "Submitted":
            return "secondary";
        case "In Progress":
            return "default";
        case "Resolved":
            return "outline";
        case "Closed":
            return "destructive";
        default:
            return "secondary";
    }
};

export function GrievanceManagement() {
    const { user } = useAuth();
    const [grievances, setGrievances] = useState<Grievance[]>(ALL_GRIEVANCES);

    const isResolvenceMember = user?.wing === 'Resolvence' || user?.role === 'President' || user?.role === 'HOD';
    const leads = ALL_USERS.filter(u => u.role === 'Lead' && u.wing === 'Resolvence');

    const handleUpdate = (id: string, newStatus?: GrievanceStatus, assignedTo?: string) => {
        setGrievances(grievances.map(g =>
            g.id === id ? { ...g, status: newStatus ?? g.status, assignedTo: assignedTo !== undefined ? assignedTo : g.assignedTo } : g
        ));
    };
    
    const getAssigneeName = (leadId?: string) => {
        if (!leadId) return "Unassigned";
        return ALL_USERS.find(u => u.id === leadId)?.name || "Unknown";
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {grievances.map((grievance) => (
                    <TableRow key={grievance.id}>
                        <TableCell className="text-muted-foreground">{format(parseISO(grievance.submittedAt), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="max-w-sm truncate">{grievance.description}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusBadgeVariant(grievance.status)}>{grievance.status}</Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <UserCheck className="h-4 w-4 text-muted-foreground" />
                                {getAssigneeName(grievance.assignedTo)}
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                           {isResolvenceMember && (
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {(['Submitted', 'In Progress', 'Resolved', 'Closed'] as GrievanceStatus[]).map(status => (
                                        <DropdownMenuItem key={status} onClick={() => handleUpdate(grievance.id, status)}>
                                            Mark as {status}
                                        </DropdownMenuItem>
                                    ))}
                                    {leads.length > 0 && <DropdownMenuSeparator />}
                                    {leads.map(lead => (
                                        <DropdownMenuItem key={lead.id} onClick={() => handleUpdate(grievance.id, undefined, lead.id)}>
                                            Assign to {lead.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                           )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
