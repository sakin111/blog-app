/* eslint-disable @typescript-eslint/no-explicit-any */
// import BlogCard from "@/components/modules/Blog/BlogCard";
import Featured from "@/components/modules/Home/Featured";
import Hero from "@/components/modules/Home/Hero";
import Popular from "@/components/modules/Home/Popular";



export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/blogGet`, {
    next: {
      tags: ["BLOGS"],
    },
  });
  const { data: blogs } = await res.json();

  return (
    <div>
     <Hero />
      <h2 className="text-center  text-4xl my-14">Featured Posts</h2>
      <div  className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            md:gap-8
            place-items-center
            p-10
          ">
        {blogs?.slice(0, 3).map((blog: any) => (
          <Featured key={blog?.id} post={blog} />
        ))}
      </div>
      <div>
        <Popular/>
      </div>
    </div>
  );
}