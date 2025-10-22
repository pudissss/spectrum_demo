import { MembersList } from "@/components/members/members-list";

export default function MembersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Member Directory</h1>
                <p className="text-muted-foreground">
                    View and manage all members of the student body.
                </p>
            </div>
            <MembersList />
        </div>
    );
}
