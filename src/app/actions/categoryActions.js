"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(prevState, formData) {
  const name = formData.get("name");
  if (!name || name.trim() === "") {
    return { message: "Nazwa kategorii jest wymagana.", type: "error" };
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return { message: `Kategoria "${name}" już istnieje.`, type: "error" };
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/blog");
    revalidatePath("/admin/blog/new");

    return {
      message: `Dodano kategorię: ${newCategory.name}`,
      type: "success",
    };
  } catch (error) {
    return { message: "Wystąpił nieoczekiwany błąd serwera.", type: "error" };
  }
}

export async function deleteCategory(prevState, formData) {
  const id = formData.get("id");
  if (!id) {
    return { message: "Błąd: Brak ID kategorii.", type: "error" };
  }
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/blog");
    return { message: "Kategoria usunięta.", type: "success" };
  } catch (error) {
    if (error.code === "P2003") {
      return {
        message:
          "Nie można usunąć kategorii, ponieważ jest przypisana do istniejących postów.",
        type: "error",
      };
    }
    return {
      message: "Wystąpił nieoczekiwany błąd podczas usuwania.",
      type: "error",
    };
  }
}
