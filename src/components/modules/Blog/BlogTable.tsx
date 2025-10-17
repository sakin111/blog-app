/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AllBlogs, useDeleteBlog } from "@/action/useCreateBlog";
import { useState } from "react";
import { EditForm } from "./EditForm";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function BlogTable() {
  const { blogs = [], isLoading, refetch } = AllBlogs();
  const deleteBlog = useDeleteBlog();

  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);


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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-full mx-auto">
      <Card className="shadow-md border border-gray-200 rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Manage Blog Posts
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {blogs.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-lg">
              No blogs found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b text-gray-700 text-sm uppercase tracking-wide">
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Author</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog: any, index: number) => (
                    <tr
                      key={blog.id || index}
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 text-gray-700 font-medium">
                        {blog.id}
                      </td>
                      <td className="p-4 font-semibold text-gray-800 truncate max-w-[300px]">
                        {blog.title}
                      </td>
                      <td className="p-4 text-gray-600">
                        {blog.author?.name || "N/A"}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-3 flex-wrap">
                          <Button
                            onClick={() => handleEdit(blog)}
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(blog.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-600 hover:bg-red-50"
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
          )}
        </CardContent>
      </Card>

      {selectedBlog && (
        <EditForm blog={selectedBlog} open={open} onClose={handleClose} />
      )}
    </div>
  );
}
