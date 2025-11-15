"use client";

import { useAuth } from "@/hooks/use-auth";
import { WeeklyLogForm } from "@/components/logs/weekly-log-form";
import { WeeklyLogViewer } from "@/components/logs/weekly-log-viewer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogsPage() {
    const { user } = useAuth();

    if (!user) return null;

    const canView = user.role === 'President' || user.role === 'Vice President' || user.role === 'HOD' || user.role === 'Superadmin' || user.role === 'Secretary' || user.role === 'Director';
    const isDirector = user.role === 'Director';
    const isLead = user.role === 'Lead';
    const canSubmit = isLead || isDirector;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Weekly Logs</h1>
                <p className="text-muted-foreground">
                    {canSubmit ? "Submit your weekly progress report." : "Review weekly logs from the wings."}
                </p>
            </div>
            
            {canSubmit && (
                 <Card>
                    <CardHeader>
                        <CardTitle>New Log Entry</CardTitle>
                        <CardDescription>Fill out the details of your work for the past week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <WeeklyLogForm />
                    </CardContent>
                </Card>
            )}

            {canView && (
                <Card>
                    <CardHeader>
                        <CardTitle>Submitted Logs</CardTitle>
                        <CardDescription>
                            {user.role === 'Director' && user.wing ? `Showing logs from your wing: ${user.wing}.` : "Showing all submitted logs."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <WeeklyLogViewer />
                    </CardContent>
                </Card>
            )}

        </div>
    );
}
