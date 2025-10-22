import { GrievanceManagement } from "@/components/grievances/grievance-management";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GrievancesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Grievance Management</h1>
                <p className="text-muted-foreground">
                    View, assign, and update the status of student grievances.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Grievances</CardTitle>
                    <CardDescription>
                        Manage all submitted grievances from this dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <GrievanceManagement />
                </CardContent>
            </Card>
        </div>
    );
}
