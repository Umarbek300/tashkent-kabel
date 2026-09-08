import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <div className="card p-6">
        <div className="mb-1 text-3xl">⚡</div>
        <h1 className="text-lg font-bold">Admin panel</h1>
        <p className="mb-4 text-sm muted">Tashkent Kabel boshqaruvi</p>
        <LoginForm />
      </div>
    </div>
  );
}
