import { PublicGrievanceForm } from "@/components/grievances/public-grievance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicGrievancePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="text-3xl font-headline">Submit a Grievance</CardTitle>
                    <CardDescription>
                        Your feedback is valuable to us. Please describe your issue below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PublicGrievanceForm />
                </CardContent>
                 <CardContent className="flex justify-center">
                    <Button variant="link" asChild>
                        <Link href="/login">Back to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
