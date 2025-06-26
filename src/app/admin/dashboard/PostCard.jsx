"use client";

import { deletePost } from "@/app/actions/postActions";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PostCard({ post }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm(`Czy na pewno chcesz usunąć posta "${post.title}"?`)) {
      await deletePost(post.slug);
      router.refresh();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 truncate">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm mb-1">
          Kategoria: {post.category || "Brak"}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          Data: {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-sm italic">"{post.excerpt}"</p>
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <Link
          href={`/admin/blog/edit/${post.slug}`}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
        >
          Edytuj
        </Link>
        <button
          onClick={handleDelete}
          className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Usuń
        </button>
      </div>
    </div>
  );
}

export default PostCard;
