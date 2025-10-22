import { PublicGrievanceForm } from "@/components/grievances/public-grievance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublicGrievancePage() {
    return (
        <div className="py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Submit a Grievance</CardTitle>
                    <CardDescription>
                        Your feedback is valuable to us. Please describe your issue below. This form is anonymous.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PublicGrievanceForm />
                </CardContent>
            </Card>
        </div>
    );
}
