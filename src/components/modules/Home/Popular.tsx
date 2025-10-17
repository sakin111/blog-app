import { ComputerIcon, Paintbrush2 , BaggageClaim,Sparkles,GitGraphIcon,Target,Cloud,Sprout} from "lucide-react";


const Popular = () => {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-sans md:text-4xl font-bold text-zinc-900 mb-4 ">
              Explore by Topic
            </h2>
            <p className="text-lg text-zinc-600 font-sans">
              Dive into your favorite subjects and discover curated content across various categories.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Technology", count: 127, icon: ComputerIcon},
              { name: "Design", count: 89, icon: Paintbrush2 },
              { name: "Business", count: 145, icon: BaggageClaim },
              { name: "Lifestyle", count: 98, icon: Sparkles },
              { name: "Development", count: 156, icon: Sprout  },
              { name: "Marketing", count: 73, icon: GitGraphIcon },
              { name: "Productivity", count: 64, icon: Target },
              { name: "Opinion", count: 52, icon: Cloud }
            ].map((category, idx) => (
              <div
                key={idx}
                className="group cursor-pointer p-6 bg-zinc-50 hover:bg-zinc-900 rounded-xl border border-zinc-200 hover:border-zinc-900 transition-all duration-300"
              >
                <div className="text-3xl mb-3"><category.icon /></div>
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-white mb-1 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {category.count} articles
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Popular;


