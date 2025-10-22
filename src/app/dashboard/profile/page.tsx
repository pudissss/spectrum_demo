import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
                <p className="text-muted-foreground">
                    Update your personal information and password.
                </p>
            </div>
            <ProfileForm />
        </div>
    );
}
