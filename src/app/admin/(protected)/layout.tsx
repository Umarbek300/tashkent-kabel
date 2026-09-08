import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
