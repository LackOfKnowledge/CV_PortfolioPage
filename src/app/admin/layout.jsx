import Link from "next/link";
import { LogoutButton, CVLinkButton } from "./components/AdminButtons";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href="/admin/dashboard"
            className="text-2xl font-semibold text-gray-800"
          >
            Panel Admina
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600"
              title="Strona główna"
            >
              <HomeIcon className="h-6 w-6" />
            </Link>
            <CVLinkButton />
            <LogoutButton />
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
