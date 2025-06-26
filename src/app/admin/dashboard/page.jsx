import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import PostCard from "./PostCard";

export const dynamic = "force-dynamic";

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  let posts = [];

  // Jeśli użytkownik jest adminem, pokaż wszystkie posty.
  // W przeciwnym razie, pokaż tylko jego posty.
  if (session?.user?.role === "admin") {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } else if (session?.user?.id) {
    posts = await prisma.post.findMany({
      where: {
        authorId: session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Zarządzanie Postami</h1>
        <Link
          href="/admin/blog/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Dodaj Post
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Nie znaleziono żadnych postów.
        </p>
      )}
    </div>
  );
}

export default DashboardPage;
