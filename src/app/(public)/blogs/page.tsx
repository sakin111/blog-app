/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blog/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description:
    "Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.",
};

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/blogGet`, {
    next: { revalidate: 60 }, 
  });

  const blogs = await res.json();

  if (!blogs?.data || !Array.isArray(blogs.data)) {
    return (
      <div className="text-center py-20 text-gray-500">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10">
        All Blogs
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.data.map((blog: any) => (
          <BlogCard key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
