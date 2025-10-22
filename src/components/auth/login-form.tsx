"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "../icons/logo";
import { UserRole } from "@/lib/types";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const { login, switchRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "User not found. Please try again.",
      });
    }
  };

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
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="president@focus.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Or quick login as:</p>
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
