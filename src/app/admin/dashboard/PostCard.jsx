"use client";

import { deletePost } from "@/app/actions/postActions";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PostCard({ post }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("Czy na pewno chcesz usunąć ten post?")) {
      try {
        await deletePost(post.id);
        router.refresh(); // Odświeża dane na stronie
      } catch (error) {
        console.error("Błąd podczas usuwania posta:", error);
        alert("Nie udało się usunąć posta.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p
          className={`text-sm font-medium mb-2 ${post.published ? "text-green-500" : "text-yellow-500"}`}
        >
          {post.published ? "Opublikowany" : "Szkic"}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Utworzono: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <Link
          href={`/admin/blog/edit/${post.id}`}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded"
        >
          Edytuj
        </Link>
        <button
          onClick={handleDelete}
          className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
        >
          Usuń
        </button>
      </div>
    </div>
  );
}

export default PostCard;
