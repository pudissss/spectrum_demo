import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ALL_BOOKINGS, ALL_GRIEVANCES, ALL_LOGS } from "@/lib/data";
import { CalendarCheck, MessageSquareWarning, BookText, ArrowUp } from "lucide-react";

export function StatsCards() {
  const totalMeetings = ALL_BOOKINGS.length;
  const totalGrievances = ALL_GRIEVANCES.length;
  const totalLogs = ALL_LOGS.length;

  const resolvedGrievances = ALL_GRIEVANCES.filter(g => g.status === 'Resolved').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Meetings Booked
          </CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMeetings}</div>
          <p className="text-xs text-muted-foreground">+5 since last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Grievances
          </CardTitle>
          <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGrievances}</div>
          <p className="text-xs text-muted-foreground">+2 since yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Logs Submitted</CardTitle>
          <BookText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLogs}</div>
          <p className="text-xs text-muted-foreground">+10 this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Grievances Resolved
          </CardTitle>
          <ArrowUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resolvedGrievances}</div>
          <p className="text-xs text-muted-foreground">75% resolution rate</p>
        </CardContent>
      </Card>
    </div>
  );
}
