"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createPost(formData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Brak autoryzacji" };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category");
  const excerpt = formData.get("excerpt");
  const thumbnail = formData.get("thumbnail");

  if (!title || !content) {
    return { error: "Tytuł i treść są wymagane." };
  }

  const slug = `${title
    .toLowerCase()
    .replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`;

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        slug,
        authorId: session.user.id,
        category,
        excerpt,
        thumbnail,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");

    return { success: true, slug: slug };
  } catch (error) {
    console.error("Błąd przy tworzeniu posta:", error);
    return { error: "Nie udało się stworzyć postu." };
  }
}

export async function updatePost(slug, formData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Brak autoryzacji");
  }

  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    return { error: "Tytuł i treść są wymagane." };
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { slug: slug },
      data: {
        title: title,
        content: content,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("Błąd podczas aktualizacji postu:", error);
    return { error: "Nie udało się zaktualizować postu." };
  }

  redirect("/admin/dashboard");
}

export async function deletePost(slug) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Brak autoryzacji");
  }

  try {
    await prisma.post.delete({
      where: { slug: slug },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("Błąd podczas usuwania postu:", error);
    return { error: "Nie udało się usunąć postu." };
  }

  redirect("/admin/dashboard");
}
