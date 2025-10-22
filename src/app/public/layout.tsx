import { Logo } from "@/components/icons/logo";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <header className="w-full max-w-4xl py-4">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo className="h-8 w-8" />
          <span className="font-headline text-xl font-semibold">FOCUS</span>
        </Link>
      </header>
      <main className="w-full max-w-4xl flex-1">
        {children}
      </main>
      <footer className="w-full max-w-4xl py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FOCUS Student Body. All rights reserved.
      </footer>
    </div>
  )
}
