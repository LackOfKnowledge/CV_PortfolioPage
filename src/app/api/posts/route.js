// src/app/api/posts/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const layoutPath = path.join(process.cwd(), "content/layout.json");

    const filenames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith(".md"))
        .map(async (filename) => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          return {
            slug: filename.replace(/\.md$/, ""),
            ...data,
          };
        })
    );

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const layoutConfig = JSON.parse(await fs.readFile(layoutPath, "utf8"));

    return NextResponse.json({ posts, layoutConfig });
  } catch (error) {
    console.error("Błąd podczas wczytywania postów lub layoutu:", error);
    return NextResponse.json(
      { error: "Nie udało się wczytać danych bloga." },
      { status: 500 }
    );
  }
}
