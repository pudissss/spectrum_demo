"use client";

import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";

export function WelcomeHeader() {
  const { user } = useAuth();
  const today = new Date();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Welcome back, {user?.name.split(' ')[0]}!
      </h1>
      <p className="text-muted-foreground">
        {format(today, "EEEE, MMMM d, yyyy")}
      </p>
    </div>
  );
}
