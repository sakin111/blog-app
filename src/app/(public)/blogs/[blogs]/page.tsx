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

// ✅ Correct signature — DO NOT use Promise<{ blogs: string }>
export async function generateMetadata({
  params,
}: {
  params: { blogs: string };
}) {
  // ✅ No `await` on params here — just use it directly
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.blogs}`, {
    cache: "no-store",
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
    description: blog.content?.slice(0, 150) || "Read more about this post",
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: { blogs: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.blogs}`, {
    cache: "no-store",
  });

  const json = await res.json();
  const blog = json.data || json.blog || {};

  if (!blog) {
    return <div className="text-center py-20 text-gray-500">Blog not found.</div>;
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <BlogDetailsCard blog={blog} />
    </div>
  );
}
