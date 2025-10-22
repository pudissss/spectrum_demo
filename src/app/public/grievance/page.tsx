import { PublicGrievanceForm } from "@/components/grievances/public-grievance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PublicGrievancePage() {
  return (
     <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4">
                <Logo />
            </div>
            <CardTitle className="text-3xl font-headline">Submit a Grievance</CardTitle>
            <CardDescription>
                Your feedback is valuable. Please describe your issue below.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <PublicGrievanceForm />
        </CardContent>
        <CardContent className="mt-4 text-center">
            <Button variant="outline" asChild>
                <Link href="/login" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
