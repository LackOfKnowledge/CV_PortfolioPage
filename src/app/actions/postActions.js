"use server";

import { revalidatePath } from "next/cache";
import {
  createPostFile,
  updatePostFile,
  deletePostFile as deleteFile,
} from "@/lib/posts";

export async function createPost(formData) {
  try {
    const { slug } = await createPostFile(formData);
    revalidatePath("/admin/dashboard");
    revalidatePath("/blog");
    return { success: true, slug };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updatePost(slug, formData) {
  try {
    const result = await updatePostFile(slug, formData);
    revalidatePath("/admin/dashboard");
    revalidatePath(`/blog/${slug}`);
    return { success: true, slug: result.slug };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deletePost(slug) {
  try {
    await deleteFile(slug);
    revalidatePath("/admin/dashboard");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
