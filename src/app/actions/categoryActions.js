// Plik: src/app/actions/categoryActions.js

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData) {
  const name = formData.get("name");
  if (!name) {
    return { error: "Nazwa kategorii jest wymagana." };
  }
  try {
    await prisma.category.create({
      data: { name },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/blog/new");
    revalidatePath("/admin/blog/edit/.*");
  } catch (error) {
    return { error: "Kategoria o tej nazwie już istnieje." };
  }
}

export async function deleteCategory(id) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
  } catch (error) {
    return {
      error:
        "Nie można usunąć kategorii, ponieważ jest ona przypisana do postów.",
    };
  }
}
