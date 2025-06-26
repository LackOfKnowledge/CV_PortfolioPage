import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

// --- Funkcje dla strony publicznej (blog) ---

export async function getPostData(slug) {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    return {
      frontmatter: data,
      content, // Zwracamy też surową treść dla formularza edycji
      contentHtml,
      slug,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPostSlugs() {
  const filenames = await fs.readdir(postsDirectory);
  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));
}

// --- Funkcje dla panelu admina ---

export async function getAllPostsForAdmin() {
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
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createMdContent(formData, originalDate) {
  const title = formData.get("title");
  const content = formData.get("content");
  const excerpt = formData.get("excerpt");
  const category = formData.get("category");
  const thumbnail = formData.get("thumbnail");
  const date = originalDate || new Date().toISOString().split("T")[0];

  if (!title || !content || !excerpt || !category) {
    throw new Error("Tytuł, treść, zajawka i kategoria są wymagane.");
  }

  const frontMatter = `---
title: "${title}"
date: "${date}"
category: "${category}"
thumbnail: "${thumbnail || "https://images.unsplash.com/photo-1518770660439-4636190af475"}"
excerpt: "${excerpt}"
---`;

  return `${frontMatter}\n\n${content}`;
}

export async function createPostFile(formData) {
  const title = formData.get("title");
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
  const fileContent = createMdContent(formData, null);
  const filePath = path.join(postsDirectory, `${slug}.md`);
  await fs.writeFile(filePath, fileContent);
  return { slug };
}

export async function updatePostFile(slug, formData) {
  const post = await getPostData(slug);
  if (!post) throw new Error("Post nie został znaleziony.");

  const fileContent = createMdContent(formData, post.frontmatter.date);
  const filePath = path.join(postsDirectory, `${slug}.md`);
  await fs.writeFile(filePath, fileContent);
  return { slug };
}

export async function deletePostFile(slug) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Błąd podczas usuwania pliku ${filePath}:`, error);
    throw new Error("Nie udało się usunąć pliku posta.");
  }
}
