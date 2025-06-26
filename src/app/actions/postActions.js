"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAuthorId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Użytkownik nie jest zalogowany.");
  }
  return session.user.id;
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function createPost(formData) {
  try {
    const authorId = await getAuthorId();
    const title = formData.get("title");

    const postData = {
      title,
      slug: createSlug(title),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      category: formData.get("category"),
      thumbnail: formData.get("thumbnail"),
      authorId,
    };

    const newPost = await prisma.post.create({ data: postData });

    revalidatePath("/admin/dashboard");
    revalidatePath("/blog");
    return { success: true, post: newPost };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updatePost(postId, formData) {
  try {
    await getAuthorId();
    const title = formData.get("title");

    const postData = {
      title,
      slug: createSlug(title),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      category: formData.get("category"),
      thumbnail: formData.get("thumbnail"),
    };

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: postData,
    });

    revalidatePath("/admin/dashboard");
    revalidatePath(`/blog/${updatedPost.slug}`);
    return { success: true, post: updatedPost };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deletePost(postId) {
  try {
    await getAuthorId();
    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
