import Link from "next/link";

export default async function Hero() {
  return (
    <div>
      <div className="max-h-screen w-full relative">
        {/* Crimson Depth */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
          }}
        />

           <div
          className="absolute bottom-0 left-0 w-full h-[140px] z-0"
          style={{
            background: `
              linear-gradient(to top, transparent 0%, rgba(0, 51, 102, 0.6) 50%, transparent 100%)

            `,
          }}
        />

        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 text-white">

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight">
            Blogs That You Will Find fascinating <br className="hidden md:block" />

          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl max-w-2xl">
         Sharing stories, insights, and ideas that connect with your thoughts and inspire new ones.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl border border-input hover:bg-accent hover:text-accent-foreground transition"
            >
              Explore Blogs
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}