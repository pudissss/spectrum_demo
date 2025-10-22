import { PublicGrievanceForm } from "@/components/grievances/public-grievance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PublicGrievancePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Submit a Grievance</CardTitle>
                    <CardDescription>
                        Your feedback is valuable to us. Please describe your issue below. This form is anonymous.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PublicGrievanceForm />
                </CardContent>
            </Card>
             <Button variant="link" asChild className="mt-4">
                <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Link>
            </Button>
        </div>
    );
}
