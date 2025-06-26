"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPostFile, deletePostFile as deleteFile } from "@/lib/posts";

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

export async function deletePost(slug) {
  try {
    await deleteFile(slug);
    revalidatePath("/admin/dashboard");
    revalidatePath("/blog");
  } catch (error) {
    return { error: error.message };
  }
}
