"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ALL_GRIEVANCES } from "@/lib/data";

const grievanceSchema = z.object({
  idNumber: z.string().regex(/^(22000|23000|24000|25000)\d+$/, "ID must start with 22000, 23000, 24000, or 25000."),
  grievanceType: z.enum(["Personal", "Infrastructure", "Academics"]),
  description: z.string().min(10, "Please provide a description with at least 10 characters."),
  block: z.string().optional(),
  roomNo: z.string().optional(),
}).refine(data => {
    if (data.grievanceType === "Infrastructure") {
        return !!data.block && !!data.roomNo;
    }
    return true;
}, {
    message: "Block and Room No. are required for Infrastructure grievances.",
    path: ["block"], // you can set the path to which field the error is associated
});

type GrievanceFormValues = z.infer<typeof grievanceSchema>;

export function PublicGrievanceForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<GrievanceFormValues>({
        resolver: zodResolver(grievanceSchema),
        defaultValues: {
            idNumber: "",
            grievanceType: "Personal",
            description: "",
            block: "",
            roomNo: ""
        }
    });

    const grievanceType = form.watch("grievanceType");

    const onSubmit = async (values: GrievanceFormValues) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newGrievance = {
            id: `grv-${Date.now()}`,
            submittedAt: new Date().toISOString(),
            description: values.description,
            status: 'Submitted',
            ...values
        };

        // This is a mock implementation
        ALL_GRIEVANCES.push(newGrievance as any);
        console.log("New Grievance Submitted:", newGrievance);

        setIsLoading(false);
        form.reset();
        toast({
            title: "Grievance Submitted",
            description: "Thank you for your feedback. We will look into it shortly.",
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 23000123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="grievanceType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grievance Type</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the type of grievance" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Personal">Personal</SelectItem>
                                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                                    <SelectItem value="Academics">Academics</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {grievanceType === "Infrastructure" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="block"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Block</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., A Block" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roomNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Room No.</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 201" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
                
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please describe your grievance in detail..."
                                    rows={6}
                                    {...field}
                                />
                            </FormControl>
                             <FormDescription>
                                Be as detailed as possible.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
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
        </Form>
    );
}
