"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";



 type ProjectInput = {
  id?:number,
  thumbnail?: string,
  features?: string[],
  description: string,
  liveSite?: string,
  liveLink?: string,
};


const AllProjects = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/project`, {
        cache: "no-store",
      });
      const json = await res.json();
      return json.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-black text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-black text-white">
        <p>Failed to load projects.</p>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-black text-white">
        <p>No projects found.</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50 text-gray-900 py-16 px-6 md:px-10 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        My <span className="text-gray-500">Projects</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-center">
        {data.map((project: ProjectInput) => (
          <Card
            key={project.id}
            className="max-w-md mx-auto border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all bg-white"
          >
            <CardHeader className="p-0 relative w-full h-56">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.liveSite || "Project thumbnail"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-t-2xl"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-2xl">
                  No Image
                </div>
              )}
            </CardHeader>

            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
         

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 ">
                  {project.features?.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-gray-100 border border-gray-200 rounded-full text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex justify-end">
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 text-gray-800 hover:bg-gray-800 hover:text-white transition-all"
                >
                  <a
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 text-gray-800 hover:bg-gray-800 hover:text-white transition-all ml-5"
                >
               
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AllProjects;
