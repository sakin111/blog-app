/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/components/modules/Blog/BlogDetails";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/blogGet`, {
    next: { revalidate: 60 },
  });

  const json = await res.json();
  const blogs = Array.isArray(json.data)
    ? json.data
    : Array.isArray(json.Objectdata)
    ? json.Objectdata
    : Array.isArray(json.blogs)
    ? json.blogs
    : [];

  return blogs.slice(0, 2).map((blog: any) => ({
    blogs: String(blog.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogs: string }>;
}) {
  const { blogs } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogs}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return {
      title: "Blog Not Found",
      description: "The blog you're looking for does not exist.",
    };
  }

  const json = await res.json();
  const blog = json.data || json.blog || {};

  return {
    title: blog.title || "Blog Details",
    description: blog.content?.slice(0, 150) || "Read more about this post.",
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ blogs: string }>;
}) {
  const { blogs } = await params; 

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogs}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-gray-500">Blog not found.</div>;
  }

  const json = await res.json();
  const blog = json.data || json.blog || {};

  if (!blog) {
    return <div className="text-center py-20 text-gray-500">Blog not found.</div>;
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="w-full">
        <BlogDetailsCard blog={blog} />
      </div>
    </div>
  );
}
