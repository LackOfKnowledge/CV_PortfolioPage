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
    revalidatePath("/admin/blog/new"); // Odśwież formularze
    revalidatePath("/admin/blog/edit/.*"); // Odśwież formularze edycji
  } catch (error) {
    return { error: "Kategoria o tej nazwie już istnieje." };
  }
}
