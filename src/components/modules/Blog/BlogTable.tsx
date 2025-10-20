/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AllBlogs, useDeleteBlog } from "@/action/useCreateBlog";
import { useState, useRef } from "react";
import { EditForm } from "./EditForm";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogTable() {
  const { blogs = [], isLoading, refetch } = AllBlogs();
  const deleteBlog = useDeleteBlog();

  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog.mutateAsync(id);
      toast.success("Blog deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete blog.");
      console.error(error);
    }
  };

  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
    refetch();
  };

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.7);
    el.scrollTo({
      left: dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-full mx-auto">
      <Card className="shadow-md border border-gray-200 rounded-2xl overflow-visible">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Manage Blog Posts
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-visible">
          {blogs.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-lg">
              No blogs found.
            </div>
          ) : (
            <div className="relative">
              {/* Scroll buttons for sm + md */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 lg:hidden">
                <button
                  aria-label="Scroll left"
                  onClick={() => scrollByAmount("left")}
                  className="p-2 rounded-full bg-white shadow-sm border border-gray-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 lg:hidden">
                <button
                  aria-label="Scroll right"
                  onClick={() => scrollByAmount("right")}
                  className="p-2 rounded-full bg-white shadow-sm border border-gray-200"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Scroll container (scrolls on sm + md only) */}
              <div
                ref={scrollerRef}
                className="
                  w-full
                  overflow-x-scroll
                  lg:overflow-x-visible
                  touch-pan-x
                  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                  -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8
                "
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Force table width on small/medium screens */}
                <div className="inline-block min-w-[750px] sm:min-w-[900px] md:min-w-[1100px] lg:min-w-full align-middle">
                  <table className="table-auto border-collapse w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b text-gray-700 text-xs sm:text-sm uppercase tracking-wide">
                        <th className="p-3 text-left hidden md:table-cell">ID</th>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left hidden md:table-cell">Author</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {blogs.map((blog: any, index: number) => (
                        <tr
                          key={blog.id ?? index}
                          className={`border-b hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="p-3 text-gray-700 font-medium hidden md:table-cell">
                            {blog.id}
                          </td>
                          <td className="p-3 font-semibold text-gray-800 text-sm truncate max-w-[180px] sm:max-w-[250px] md:max-w-[300px]">
                            {blog.title}
                          </td>
                          <td className="p-3 text-gray-600 hidden md:table-cell">
                            {blog.author?.name || "N/A"}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                              <Button
                                onClick={() => handleEdit(blog)}
                                size="sm"
                                variant="outline"
                                className="border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center"
                              >
                                <Pencil className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDelete(blog.id)}
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* hint message for sm & md users */}
              <div className="lg:hidden mt-2 px-4 text-xs text-gray-500 select-none text-center">
                Swipe left/right or use the arrows to see more columns
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedBlog && (
        <EditForm blog={selectedBlog} open={open} onClose={handleClose} />
      )}
    </div>
  );
}
