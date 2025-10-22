"use client";

import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export function WelcomeHeader() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Welcome back, {user?.name.split(' ')[0]}!
      </h1>
      <p className="text-muted-foreground">
        {currentDate}
      </p>
    </div>
  );
}
