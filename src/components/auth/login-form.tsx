"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "../icons/logo";
import { UserRole } from "@/lib/types";

export function LoginForm() {
  const { switchRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
    router.push('/dashboard');
     toast({
        title: `Switched to ${role}`,
        description: "Welcome!",
      });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="text-3xl font-headline">FOCUS</CardTitle>
        <CardDescription>Student Body Management System</CardDescription>
      </CardHeader>
      <CardContent>
         <div className="text-center text-muted-foreground">
            <p>Please select your role to continue.</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => handleQuickLogin('President')}>President</Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickLogin('Vice President')}>Vice President</Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickLogin('HOD')}>HOD</Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickLogin('Director')}>Director</Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickLogin('Lead')}>Lead</Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickLogin('Treasurer')}>Treasurer</Button>
        </div>
        <Button variant="link" size="sm" onClick={() => router.push('/public/grievance')}>Submit a Grievance</Button>
      </CardFooter>
    </Card>
  );
}
