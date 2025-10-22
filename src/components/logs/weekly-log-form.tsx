"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function WeeklyLogForm() {
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState<'On Track' | 'Delayed' | 'Completed' | ''>('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !progress) {
            toast({
                variant: 'destructive',
                title: 'Incomplete Form',
                description: 'Please fill out all fields.',
            });
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('New Log:', { leadId: user?.id, description, progress });
        
        setIsLoading(false);
        setDescription('');
        setProgress('');
        toast({
            title: 'Log Submitted',
            description: 'Your weekly log has been successfully submitted.',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="description">Update Description</Label>
                <Textarea
                    id="description"
                    placeholder="Describe your progress, challenges, and next steps..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="progress">Progress Status</Label>
                 <Select value={progress} onValueChange={(value) => setProgress(value as any)} disabled={isLoading}>
                    <SelectTrigger id="progress">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="On Track">On Track</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit Log"
                )}
            </Button>
        </form>
    );
}
