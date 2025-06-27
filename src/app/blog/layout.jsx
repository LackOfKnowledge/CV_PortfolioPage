// Plik: src/app/blog/layout.jsx

import BlogLayout from "@/components/BlogLayout";
import BlogSidebar from "@/components/BlogSidebar";

export default function LayoutForBlogPages({ children }) {
  return <BlogLayout blogSidebar={<BlogSidebar />}>{children}</BlogLayout>;
}
