"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function PublicGrievanceForm() {
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim().length < 10) {
            toast({
                variant: "destructive",
                title: "Invalid Input",
                description: "Please provide a description with at least 10 characters.",
            });
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("New Grievance Submitted:", description);

        setIsLoading(false);
        setDescription("");
        toast({
            title: "Grievance Submitted",
            description: "Thank you for your feedback. We will look into it shortly.",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                placeholder="Please describe your grievance in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                disabled={isLoading}
            />
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Grievance"
                )}
            </Button>
        </form>
    );
}
