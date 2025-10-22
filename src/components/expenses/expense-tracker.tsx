"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { ALL_EXPENSES } from "@/lib/data";
import { Expense } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { Loader2, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const expenseSchema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters."),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  type: z.enum(["Income", "Expense"]),
});

export function ExpenseTracker() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(ALL_EXPENSES);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "Expense",
    },
  });

  const onSubmit = async (values: z.infer<typeof expenseSchema>) => {
    if (user?.role !== "Treasurer") {
      toast({ variant: "destructive", title: "Unauthorized" });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      date: new Date().toISOString(),
      ...values,
    };

    setExpenses(prev => [newExpense, ...prev]);
    toast({ title: "Transaction logged successfully!" });
    form.reset();
    setIsLoading(false);
  };
  
  const totalIncome = expenses.filter(e => e.type === 'Income').reduce((acc, e) => acc + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'Expense').reduce((acc, e) => acc + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  if (user?.role !== 'Treasurer') {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Only the Treasurer can access this page.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
                </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View all recent income and expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map(exp => (
                  <TableRow key={exp.id}>
                    <TableCell>{format(parseISO(exp.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{exp.description}</TableCell>
                    <TableCell className={cn("text-right font-medium", exp.type === 'Income' ? 'text-emerald-500' : 'text-red-500')}>
                      {exp.type === 'Income' ? '+' : '-'} ${exp.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Log Transaction</CardTitle>
            <CardDescription>Add a new income or expense entry.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sponsorship, Event costs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                            <SelectItem value="Income">Income</SelectItem>
                            <SelectItem value="Expense">Expense</SelectItem>
                         </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : "Log Transaction"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
