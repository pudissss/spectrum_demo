import { ExpenseTracker } from "@/components/expenses/expense-tracker";

export default function ExpensesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Expense Management</h1>
                <p className="text-muted-foreground">
                    Track all income and expenses for the student body.
                </p>
            </div>
            <ExpenseTracker />
        </div>
    );
}
