import { AuditLog } from "@/components/dashboard/audit-log";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuditLogPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Audit Log</h1>
                <p className="text-muted-foreground">
                    Track user login and role switching events across the system.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Login & Role Switch History</CardTitle>
                    <CardDescription>
                        A chronological record of all user access events.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuditLog />
                </CardContent>
            </Card>
        </div>
    );
}
