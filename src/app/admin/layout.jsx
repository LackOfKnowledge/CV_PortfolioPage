import AdminPanelRoot from "./components/AdminPanelRoot";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin/dashboard");
  }
  return <AdminPanelRoot>{children}</AdminPanelRoot>;
}
