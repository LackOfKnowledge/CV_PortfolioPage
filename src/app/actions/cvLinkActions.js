"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCvLink(formData) {
  const name = formData.get("name");
  const expiresInDays = parseInt(formData.get("expiresIn"), 10) || 7;

  if (!name) {
    return { error: "Nazwa linku jest wymagana." };
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  try {
    const newLink = await prisma.cvLink.create({
      data: {
        name,
        expiresAt,
      },
    });
    revalidatePath("/admin/cv");
    return { success: true, link: newLink };
  } catch (error) {
    return { error: "Nie udało się utworzyć linku." };
  }
}

export async function deleteCvLink(id) {
  try {
    await prisma.cvLink.delete({
      where: { id },
    });
    revalidatePath("/admin/cv");
    return { success: true };
  } catch (error) {
    return { error: "Nie udało się usunąć linku." };
  }
}
