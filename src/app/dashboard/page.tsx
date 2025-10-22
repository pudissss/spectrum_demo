"use client";

import { useAuth } from "@/hooks/use-auth";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DirectorRatings } from "@/components/dashboard/director-ratings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyLogViewer } from "@/components/logs/weekly-log-viewer";
import { GrievanceManagement } from "@/components/grievances/grievance-management";
import { WeeklyLogForm } from "@/components/logs/weekly-log-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const isPrivileged = user.role === 'President' || user.role === 'HOD';

  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader />
      
      {isPrivileged && (
        <>
          <StatsCards />
        </>
      )}

      {user.role === 'Director' && user.wing && (
        <div className="grid gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>My Wing's Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <WeeklyLogViewer />
                </CardContent>
            </Card>
            {user.wing === 'Resolvence' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Grievance Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GrievanceManagement />
                    </CardContent>
                </Card>
            )}
        </div>
      )}

      {user.role === 'Lead' && (
        <Card>
            <CardHeader>
                <CardTitle>Submit Your Weekly Log</CardTitle>
            </CardHeader>
            <CardContent>
                <WeeklyLogForm />
            </CardContent>
        </Card>
      )}

      <DirectorRatings />

    </div>
  );
}
