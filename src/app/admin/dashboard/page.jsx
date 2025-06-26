import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/posts";
import PostCard from "./PostCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Twoje Posty</h1>
        <Link
          href="/admin/blog/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition duration-300 text-lg"
        >
          Dodaj Post
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <p className="text-xl text-gray-600">
            Nie masz jeszcze żadnych postów.
          </p>
          <p className="mt-2 text-gray-400">
            Dodaj nowy post, aby go tu zobaczyć.
          </p>
        </div>
      )}
    </div>
  );
}
