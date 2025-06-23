// src/app/api/admin/posts/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import path from "path";
import fs from "fs/promises";

// Funkcja pomocnicza do tworzenia "slugów" z tytułów
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-");

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  try {
    const { title, content, category, thumbnail, excerpt, date } =
      await req.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Tytuł, treść i kategoria są wymagane." },
        { status: 400 }
      );
    }

    const slug = slugify(title);
    const filename = `${slug}.md`;
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const filePath = path.join(postsDirectory, filename);

    // Sprawdzenie, czy plik o takim slugu już istnieje
    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: "Post z takim tytułem (slug) już istnieje." },
        { status: 409 }
      );
    } catch (e) {
      // Plik nie istnieje, możemy kontynuować
    }

    const fileContent = `---
title: '${title.replace(/'/g, "''")}'
date: '${date || new Date().toISOString().split("T")[0]}'
category: '${category}'
thumbnail: '${thumbnail || ""}'
excerpt: '${excerpt.replace(/'/g, "''") || ""}'
---

${content}
`;

    await fs.writeFile(filePath, fileContent, "utf8");

    return NextResponse.json(
      { message: "Post został pomyślnie utworzony.", slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Błąd podczas tworzenia posta:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas zapisywania posta." },
      { status: 500 }
    );
  }
}
