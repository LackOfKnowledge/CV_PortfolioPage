import AdminPanelRoot from "./components/AdminPanelRoot";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  // Sprawdzamy sesję po stronie serwera
  const session = await getServerSession(authOptions);

  // Jeśli nie ma sesji (użytkownik nie jest zalogowany),
  // przekierowujemy go na stronę główną lub stronę logowania
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin/dashboard");
  }

  // Jeśli sesja istnieje, renderujemy panel
  return <AdminPanelRoot>{children}</AdminPanelRoot>;
}
