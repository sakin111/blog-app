/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default async function BlogDetailsCard({ blog }: { blog: any }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left leading-tight">
        {blog?.title}
      </h1>

      {/* Author Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={
              blog.author?.picture ||
              "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            }
            alt={blog?.author?.name || "Author"}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-lg">
              {blog.author?.name || "Unknown Author"}{" "}
              {blog.author?.isVerified && (
                <span className="inline-block ml-1 text-blue-500">✔</span>
              )}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(blog.createdAt).toLocaleDateString()} •{" "}
              {blog.views || 0} views
            </p>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[480px] overflow-hidden rounded-lg shadow-md mb-10">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article className="prose prose-sm sm:prose lg:prose-lg max-w-none text-justify leading-relaxed">
        <p>{blog.content}</p>
      </article>
    </main>
  );
}
