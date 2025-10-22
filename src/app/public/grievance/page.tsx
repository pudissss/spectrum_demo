"use client";

import { PublicGrievanceForm } from "@/components/grievances/public-grievance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons/logo";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicGrievancePage() {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a"));
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
             <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="text-3xl font-headline">Submit a Grievance</CardTitle>
                    <CardDescription>
                       <p>Your feedback is valuable to us. Please fill out the form below.</p>
                        <p className="text-xs text-muted-foreground mt-2">{currentDate}</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PublicGrievanceForm />
                </CardContent>
            </Card>
            <Button variant="link" asChild className="mt-4">
                <Link href="/login">Member Login</Link>
            </Button>
        </div>
    );
}